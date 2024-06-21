import { describe, expect, it } from 'vitest';

import nodeCrypto from '../fixtures/crypto/nodeCrypto';
import { sampleDatabasesKeePassXC } from '../fixtures/databases';
import createPasswordKey from './keys/createPasswordKey';
import readHeaderFields from './outerHeader/readHeaderFields';
import readSignature from './outerHeader/readSignature';
import readDatabase from './readDatabase';
import { type KdbxAesKdfParameters } from './types';
import updateKeysForWrite from './updateKeysForWrite';
import BufferReader from './utilities/BufferReader';
import writeDatabase from './writeDatabase';

describe('writeDatabase', () => {
  it('can write a readable header', async () => {
    // Arrange
    const keys = [await createPasswordKey(nodeCrypto, 'password')];
    const originalFile = await readDatabase(
      nodeCrypto,
      keys,
      sampleDatabasesKeePassXC.AesAesCompressed.file,
    );

    const file = await updateKeysForWrite(nodeCrypto, originalFile);

    // Act
    const result = await writeDatabase(nodeCrypto, file, keys);

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
});
