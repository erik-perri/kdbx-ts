import { describe, expect, it } from 'vitest';

import nodeCrypto from '../fixtures/crypto/nodeCrypto';
import { sampleDatabasesKeePassXC } from '../fixtures/databases';
import createPasswordKey from './keys/createPasswordKey';
import readHeaderFields from './outerHeader/readHeaderFields';
import readSignature from './outerHeader/readSignature';
import readDatabase from './readDatabase';
import { type KdbxAesKdfParameters } from './types';
import BufferReader from './utilities/BufferReader';
import writeDatabase from './writeDatabase';

describe('writeDatabase', () => {
  it('can write a readable header', async () => {
    // Arrange
    const keys = [await createPasswordKey(nodeCrypto, 'password')];
    const database = await readDatabase(
      nodeCrypto,
      keys,
      sampleDatabasesKeePassXC.AesAesCompressed.file,
    );

    // Act
    const result = await writeDatabase(nodeCrypto, database, keys);

    const reader = new BufferReader(result);

    readSignature(reader);

    const header = readHeaderFields(reader);

    // Assert
    expect(header.cipherId).toEqual(database.header.cipherId);
    expect(header.compressionFlags).toEqual(database.header.compressionFlags);
    expect(header.endOfHeader).toEqual(database.header.endOfHeader);
    expect((header.kdfParameters as KdbxAesKdfParameters).rounds).toEqual(
      (database.header.kdfParameters as KdbxAesKdfParameters).rounds,
    );

    expect(header.encryptionIV).not.toEqual(database.header.encryptionIV);
    expect(header.kdfParameters.seed).not.toEqual(
      database.header.kdfParameters.seed,
    );
    expect(header.masterSeed).not.toEqual(database.header.masterSeed);
  });
});
