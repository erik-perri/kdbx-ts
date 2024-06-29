import fs from 'node:fs';

import pako from 'pako';
import { describe, expect, it, vitest } from 'vitest';

import { sampleDatabasesKeePassXC } from '../fixtures/databases';
import createPasswordKey from './keys/createPasswordKey';
import readHeaderFields from './outerHeader/readHeaderFields';
import readSignature from './outerHeader/readSignature';
import randomizeSeeds from './randomizeSeeds';
import readKdbxFile from './readKdbxFile';
import { type KdbxAesKdfParameters } from './types/format';
import BufferReader from './utilities/BufferReader';
import writeKdbxFile from './writeKdbxFile';

describe('writeKdbxFile', () => {
  it('can write a readable header', async () => {
    // Arrange
    const keys = [await createPasswordKey('password')];
    const originalFile = await readKdbxFile(
      keys,
      sampleDatabasesKeePassXC.AesAesCompressed.file,
    );

    const file = await randomizeSeeds(originalFile);

    // Act
    const result = await writeKdbxFile(keys, file);

    const reader = new BufferReader(result);

    readSignature(reader);

    const header = readHeaderFields(reader);

    // Assert
    expect(header.cipherAlgorithm).toEqual(originalFile.header.cipherAlgorithm);
    expect(header.compressionAlgorithm).toEqual(
      originalFile.header.compressionAlgorithm,
    );
    expect(header.endOfHeader).toEqual(originalFile.header.endOfHeader);
    expect((header.kdfParameters as KdbxAesKdfParameters).rounds).toEqual(
      (originalFile.header.kdfParameters as KdbxAesKdfParameters).rounds,
    );

    expect(header.encryptionIV).not.toEqual(originalFile.header.encryptionIV);
    expect(header.kdfParameters.seed).not.toEqual(
      originalFile.header.kdfParameters.seed,
    );
    expect(header.masterSeed).not.toEqual(originalFile.header.masterSeed);
  });

  it('does not modify a database by reading and writing', async () => {
    // Arrange
    let capturedPostInflatedData: Uint8Array | undefined;
    let capturedPreDeflatedData: Uint8Array | undefined;

    const inflateSpy = vitest
      .spyOn(pako, 'inflate')
      .mockImplementationOnce((data, options) => {
        capturedPostInflatedData = pako.inflate(data, options);
        return capturedPostInflatedData;
      });

    const deflateSpy = vitest
      .spyOn(pako, 'deflate')
      .mockImplementationOnce((data, options) => {
        if (!ArrayBuffer.isView(data)) {
          throw new Error('Expected Uint8Array');
        }
        capturedPreDeflatedData = Uint8Array.from(data);
        return pako.deflate(data, options);
      });

    const original = fs.readFileSync(
      'fixtures/databases/keepassxc-kdbx4-aes-kdf-aes-features.kdbx',
    );
    const keys = [await createPasswordKey('password')];
    const parsed = await readKdbxFile(keys, original);

    // Act
    const saved = await writeKdbxFile(keys, parsed);

    // Assert
    // Since the GZip compression produces different results, we have to compare the uncompressed data
    // captured in the pako spies.
    expect(inflateSpy).toHaveBeenCalledTimes(2);
    expect(deflateSpy).toHaveBeenCalledTimes(2);
    expect(capturedPostInflatedData).toBeDefined();
    expect(capturedPreDeflatedData).toBeDefined();
    expect(capturedPostInflatedData).toEqual(capturedPreDeflatedData);

    // Check the outer header
    // TODO Detect this position automatically
    expect(Uint8Array.from(original.subarray(0, 271))).toEqual(
      Uint8Array.from(saved.subarray(0, 271)),
    );
  });
});
