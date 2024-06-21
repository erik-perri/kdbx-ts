import { describe, expect, it } from 'vitest';

import validateKdfArgon2Parallelism from './validateKdfArgon2Parallelism';

describe('validateKdfArgon2Parallelism', () => {
  it('does not modify input', () => {
    // Arrange
    const parallelism = BigInt(2);

    // Act
    const result = validateKdfArgon2Parallelism(parallelism);

    // Assert
    expect(result).toBe(parallelism);
  });

  it.each([
    [
      'above',
      {
        error:
          'Invalid number of threads. Expected between 1 and 16777216, got 16777217',
        value: BigInt(16777217),
      },
    ],
    [
      'below',
      {
        error:
          'Invalid number of threads. Expected between 1 and 16777216, got 0',
        value: BigInt(0),
      },
    ],
  ])('fails if %s limit', (_, { error, value }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    expect(() => validateKdfArgon2Parallelism(value)).toThrowError(error);

    // Assert
    // Nothing to assert.
  });
});
