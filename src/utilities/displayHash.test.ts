import * as crypto from 'crypto';
import { describe, expect, it } from 'vitest';

import displayHash from './displayHash';

function hash(algorithm: string, value: string): Uint8Array {
  const hash = crypto.createHash(algorithm);

  hash.update(value);

  return Uint8Array.from(hash.digest());
}

describe('displayHash', () => {
  it('throws error when empty', () => {
    // Arrange
    const bytes = Uint8Array.from([]);

    // Act
    expect(() => displayHash(bytes)).toThrowError(
      'Unexpected hash length. Expected at least 1 byte',
    );

    // Assert
    // No assertions.
  });

  it.each([
    [
      'md5',
      {
        hash: hash('md5', 'test'),
        expected: '098f6bcd4621d373cade4e832627b4f6',
      },
    ],
    [
      'sha1',
      {
        hash: hash('sha1', 'test'),
        expected: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      },
    ],
    [
      'sha256',
      {
        hash: hash('sha256', 'test'),
        expected:
          '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      },
    ],
  ])('displays %s correctly', (_, { hash, expected }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = displayHash(hash);

    // Assert
    expect(result).toBe(expected);
  });
});
