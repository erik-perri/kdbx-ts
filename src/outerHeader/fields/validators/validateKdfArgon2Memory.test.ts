import { describe, expect, it } from 'vitest';

import validateKdfArgon2Memory from './validateKdfArgon2Memory';

describe('validateKdfArgon2Memory', () => {
  it('does not modify input', () => {
    // Arrange
    const memory = BigInt(1024);

    // Act
    const result = validateKdfArgon2Memory(memory);

    // Assert
    expect(result).toBe(memory);
  });

  it.each([
    [
      'above',
      {
        error:
          'Invalid memory size. Expected between 8 and 4294967296, got 4294967297',
        value: BigInt(4294967297),
      },
    ],
    [
      'below',
      {
        error: 'Invalid memory size. Expected between 8 and 4294967296, got 7',
        value: BigInt(7),
      },
    ],
  ])('fails if %s limit', (_, { error, value }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    expect(() => validateKdfArgon2Memory(value)).toThrowError(error);

    // Assert
    // Nothing to assert.
  });
});
