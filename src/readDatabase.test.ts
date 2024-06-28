import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

import { sampleDatabaseCases } from '../fixtures/databases';
import createPasswordKey from './keys/createPasswordKey';
import readDatabase from './readDatabase';
import type { KdbxKey } from './types/keys';

describe('readDatabase', () => {
  it('fails when encountering an unknown file type', async () => {
    // Arrange
    const key: KdbxKey = await createPasswordKey('what');
    const bytes = Uint8Array.from(
      Array.from({ length: 20 }, (_, index) => index),
    );

    // Act
    await expect(readDatabase([key], bytes)).rejects.toThrow(
      'Unknown database format',
    );

    // Assert
    // No assertions.
  });

  it.each([
    [
      'KeePass 1.x',
      {
        file: readFileSync('fixtures/databases/keepass1-aes.kdb'),
        expected: 'KeePass1 databases are not supported',
      },
    ],
    [
      'Kdbx 2.x',
      {
        file: readFileSync(
          'fixtures/databases/keepass2-kdbx2-aes-kdf-aes.kdbx',
        ),
        expected: 'KeePass2 v2.x databases are not supported',
      },
    ],
    [
      'Kdbx 3.x',
      {
        file: readFileSync('fixtures/databases/keepassxc-kdbx3-aes-kdf.kdbx'),
        expected: 'KeePass2 v3.x databases are not supported',
      },
    ],
  ])(
    'fails when encountering an unsupported file type %s',
    async (_, { file, expected }) => {
      // Arrange
      const key: KdbxKey = await createPasswordKey('what');

      // Act
      await expect(readDatabase([key], file)).rejects.toThrow(expected);

      // Assert
      // No assertions.
    },
  );

  it.each(sampleDatabaseCases)(
    'failed with invalid password %s',
    async (_, { file }) => {
      // Arrange
      const key: KdbxKey = await createPasswordKey('what');

      // Act
      await expect(readDatabase([key], file)).rejects.toThrow('HMAC mismatch');

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
      const parsed = await readDatabase(keys, file);

      // Assert
      expect(parsed.database.metadata.name).toEqual('Passwords');
      expect(parsed.database.root.group.entries?.[0].attributes?.Title).toEqual(
        {
          isProtected: false,
          key: 'Title',
          value: 'Sample Entry',
        },
      );
      expect(
        parsed.database.root.group.entries?.[0].attributes?.Password,
      ).toEqual({
        isProtected: true,
        key: 'Password',
        value: 'winking-unicycle-ecology-decimal',
      });
    },
  );

  it.each([
    [
      'KeePassXC',
      {
        file: readFileSync(
          'fixtures/databases/keepassxc-kdbx4-aes-kdf-aes-features.kdbx',
        ),
      },
    ],
    [
      'KeePass2',
      {
        file: readFileSync(
          'fixtures/databases/keepass2-kdbx4-aes-kdf-chacha-features.kdbx',
        ),
      },
    ],
  ])('parses known fields from %s', async (_, { file }) => {
    // Arrange
    const keys = [await createPasswordKey('password')];

    // Act
    const parsed = await readDatabase(keys, file);

    // Assert
    expect(parsed).toMatchSnapshot();
  });
});
