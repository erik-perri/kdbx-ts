import { describe, expect, it } from 'vitest';

import nodeCrypto from '../fixtures/crypto/nodeCrypto';
import { sampleDatabases } from '../fixtures/databases';
import { type AesKdfParameters } from './header/types';
import createPasswordKey from './keys/createPasswordKey';
import readKdbxFile from './readKdbxFile';
import BufferReader from './utilities/BufferReader';
import readHeader from './version4/readHeader';
import writeKdbxFile from './writeKdbxFile';

describe('writeKdbxFile', () => {
  it('can write a readable header', async () => {
    // Arrange
    const keys = [await createPasswordKey(nodeCrypto, 'password')];
    const database = await readKdbxFile(
      nodeCrypto,
      keys,
      sampleDatabases.AesAesCompressed.file,
    );

    // Act
    const result = await writeKdbxFile(nodeCrypto, database, keys);
    const reader = new BufferReader(result);

    // Skip the signature and version fields.
    reader.readUInt32LE();
    reader.readUInt32LE();
    reader.readUInt32LE();
    const header = readHeader(reader);

    // Assert
    expect(header.cipherId).toEqual(database.header.cipherId);
    expect(header.cipherMode).toEqual(database.header.cipherMode);
    expect(header.compressionAlgorithm).toEqual(
      database.header.compressionAlgorithm,
    );
    expect((header.kdfParameters as AesKdfParameters).rounds).toEqual(
      (database.header.kdfParameters as AesKdfParameters).rounds,
    );

    expect(header.encryptionIV).not.toEqual(database.header.encryptionIV);
    expect(header.kdfParameters.seed).not.toEqual(
      database.header.kdfParameters.seed,
    );
    expect(header.masterSeed).not.toEqual(database.header.masterSeed);
  });
});
