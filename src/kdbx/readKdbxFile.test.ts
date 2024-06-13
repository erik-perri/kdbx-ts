import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

import PasswordKey from './keys/PasswordKey';
import readKdbxFile from './readKdbxFile';

describe('readKdbxFile', () => {
  it('fails when encountering an unknown file type', async () => {
    // Arrange
    const key = new PasswordKey();
    const bytes = Uint8Array.from([]);

    // Act
    await expect(readKdbxFile(key, bytes)).rejects.toThrow(
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
        expected: 'KeePass 1 databases are not supported',
      },
    ],
    [
      'Kdbx 3.x',
      {
        file: readFileSync('fixtures/databases/kdbx3-aes-kdf.kdbx'),
        expected: 'KeePass databases less than v4.0 are not supported',
      },
    ],
  ])(
    'fails when encountering an unsupported file type %s',
    async (_, { file, expected }) => {
      // Arrange
      const key = new PasswordKey();

      // Act
      await expect(readKdbxFile(key, file)).rejects.toThrow(expected);

      // Assert
      // No assertions.
    },
  );
});
