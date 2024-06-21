import { describe, expect, it } from 'vitest';

import validateKdfArgon2Version from './validateKdfArgon2Version';

describe('validateKdfArgon2Version', () => {
  it('does not modify input', () => {
    // Arrange
    const version = 0x13;

    // Act
    const result = validateKdfArgon2Version(version);

    // Assert
    expect(result).toBe(version);
  });

  it('fails if version is invalid', () => {
    // Arrange
    // Nothing to arrange.

    // Act
    expect(() => validateKdfArgon2Version(0x14)).toThrowError(
      'Invalid Argon2 version. Expected one of "0x10" or "0x13", got "0x14"',
    );

    // Assert
    // Nothing to assert.
  });
});
