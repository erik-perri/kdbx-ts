import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from '../../../utilities/Uint8ArrayHelper';
import validateKdfSeed from './validateKdfSeed';

describe('validateKdfSeed', () => {
  it('does not modify input', () => {
    // Arrange
    const seed = Uint8ArrayHelper.fromString('seed'.repeat(2));

    // Act
    const result = validateKdfSeed(seed);

    // Assert
    expect(result).toBe(seed);
  });

  it.each([
    [
      'above',
      {
        error: 'Invalid seed size. Expected between 8 and 32 bytes, got 36',
        value: Uint8ArrayHelper.fromString('seed'.repeat(9)),
      },
    ],
    [
      'below',
      {
        error: 'Invalid seed size. Expected between 8 and 32 bytes, got 4',
        value: Uint8ArrayHelper.fromString('seed'),
      },
    ],
  ])('fails if %s limit', (_, { error, value }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    expect(() => validateKdfSeed(value)).toThrowError(error);

    // Assert
    // Nothing to assert.
  });
});
