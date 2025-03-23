import fs from 'node:fs';

import { describe, expect, it } from 'vitest';

import { sampleDatabasesKeePassXC } from '../tests/fixtures/databases';
import randomizeSeeds from './helpers/randomizeSeeds';
import createPasswordKey from './keys/createPasswordKey';
import readHeaderFields from './outerHeader/readHeaderFields';
import readSignature from './outerHeader/readSignature';
import readKdbxFile from './readKdbxFile';
import { type KdbxAesKdfParameters } from './types/format';
import BufferReader from './utilities/BufferReader';
import writeKdbxFile from './writeKdbxFile';

describe('writeKdbxFile', () => {
  it('can write a readable header', async () => {
    // Arrange
    const keys = [await createPasswordKey('password')];
    const { file: originalFile } = await readKdbxFile(
      keys,
      sampleDatabasesKeePassXC.AesAesCompressed.file,
    );

    const file = await randomizeSeeds(originalFile);

    // Act
    const result = await writeKdbxFile(keys, file);

    const reader = new BufferReader(result.bytes);

    readSignature(reader);

    const header = readHeaderFields(reader);

    // Assert
    expect(header.cipherAlgorithm).toEqual(
      originalFile.outerHeader.fields.cipherAlgorithm,
    );
    expect(header.compressionAlgorithm).toEqual(
      originalFile.outerHeader.fields.compressionAlgorithm,
    );
    expect(header.endOfHeader).toEqual(
      originalFile.outerHeader.fields.endOfHeader,
    );
    expect((header.kdfParameters as KdbxAesKdfParameters).rounds).toEqual(
      (originalFile.outerHeader.fields.kdfParameters as KdbxAesKdfParameters)
        .rounds,
    );

    expect(header.encryptionIV).not.toEqual(
      originalFile.outerHeader.fields.encryptionIV,
    );
    expect(header.kdfParameters.seed).not.toEqual(
      originalFile.outerHeader.fields.kdfParameters.seed,
    );
    expect(header.masterSeed).not.toEqual(
      originalFile.outerHeader.fields.masterSeed,
    );
  });

  it('does not modify a database by reading and writing', async () => {
    // Arrange
    const original = fs.readFileSync(
      'tests/fixtures/databases/keepassxc-kdbx4-aes-kdf-aes-features.kdbx',
    );
    const keys = [await createPasswordKey('password')];
    const { file } = await readKdbxFile(keys, original);

    // Act
    const saved = await writeKdbxFile(keys, file);
    const { file: savedFile } = await readKdbxFile(keys, saved.bytes);

    // Assert
    expect(savedFile).toEqual(file);
  });
});
