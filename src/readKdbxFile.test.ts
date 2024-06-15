import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

import nodeCrypto from '../fixtures/crypto/nodeCrypto';
import {
  sampleDatabaseCases,
  sampleDatabaseFeatures,
} from '../fixtures/databases';
import createPasswordKey from './keys/createPasswordKey';
import { type KdbxKey } from './keys/types';
import readKdbxFile from './readKdbxFile';

describe('readKdbxFile', () => {
  it('fails when encountering an unknown file type', async () => {
    // Arrange
    const key: KdbxKey = await createPasswordKey(nodeCrypto, 'what');
    const bytes = Uint8Array.from([]);

    // Act
    await expect(readKdbxFile(nodeCrypto, [key], bytes)).rejects.toThrow(
      'Unknown database format',
    );

    // Assert
    // No assertions.
  });

  it.each([
    [
      'KeePass 1.x',
      {
        file: readFileSync('fixtures/databases/kp1-aes.kdb'),
        expected: 'KeePass1 databases are not supported',
      },
    ],
    [
      'Kdbx 3.x',
      {
        file: readFileSync('fixtures/databases/kdbx3-aes-kdf.kdbx'),
        expected: 'KeePass2 databases less than v4.0 are not supported',
      },
    ],
  ])(
    'fails when encountering an unsupported file type %s',
    async (_, { file, expected }) => {
      // Arrange
      const key: KdbxKey = await createPasswordKey(nodeCrypto, 'what');

      // Act
      await expect(readKdbxFile(nodeCrypto, [key], file)).rejects.toThrow(
        expected,
      );

      // Assert
      // No assertions.
    },
  );

  it.each(sampleDatabaseCases)(
    'failed with invalid password %s',
    async (_, { file }) => {
      // Arrange
      const key: KdbxKey = await createPasswordKey(nodeCrypto, 'what');

      // Act
      await expect(readKdbxFile(nodeCrypto, [key], file)).rejects.toThrow(
        'HMAC mismatch',
      );

      // Assert
      // No assertions.
    },
  );

  it.each(sampleDatabaseCases)(
    'parses with valid password %s',
    async (_, { file, keyFactory }) => {
      // Arrange
      const keys: KdbxKey[] = await keyFactory();

      // Act
      const parsed = await readKdbxFile(nodeCrypto, keys, file);

      // Assert
      expect(parsed.database.metadata.name).toEqual('Passwords');
      expect(parsed.database.rootGroup.entries?.[0].attributes.Title).toEqual(
        'Sample Entry',
      );
      expect(
        parsed.database.rootGroup.entries?.[0].attributes.Password,
      ).toEqual('winking-unicycle-ecology-decimal');
    },
  );

  it('parses known fields', async () => {
    // Arrange
    const keys = [await createPasswordKey(nodeCrypto, 'password')];

    // Act
    const parsed = await readKdbxFile(
      nodeCrypto,
      keys,
      readFileSync('fixtures/databases/kdbx4-aes-kdf-aes-features.kdbx'),
    );

    // Assert
    expect(parsed.database).toEqual(sampleDatabaseFeatures);
  });
});
