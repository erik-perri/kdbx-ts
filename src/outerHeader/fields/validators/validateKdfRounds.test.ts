import { describe, expect, it } from 'vitest';

import validateKdfRounds from './validateKdfRounds';

describe('validateKdfRounds', () => {
  it('does not modify input', () => {
    // Arrange
    const rounds = BigInt(2);

    // Act
    const result = validateKdfRounds(rounds);

    // Assert
    expect(result).toBe(rounds);
  });

  it.each([
    [
      'above',
      {
        error:
          'Invalid number of rounds. Expected between 1 and 9007199254740991, got 9007199254740992',
        value: BigInt(Number.MAX_SAFE_INTEGER + 1),
      },
    ],
    [
      'below',
      {
        error:
          'Invalid number of rounds. Expected between 1 and 9007199254740991, got 0',
        value: BigInt(0),
      },
    ],
  ])('fails if %s limit', (_, { error, value }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    expect(() => validateKdfRounds(value)).toThrowError(error);

    // Assert
    // Nothing to assert.
  });
});
