import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeMasterSeedValue from './deserializeMasterSeedValue';

describe('deserializeMasterSeedValue', () => {
  it('does not modify data', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromString('Test'.repeat(8));

    // Act
    const result = deserializeMasterSeedValue(data);

    // Assert
    expect(result).toEqual(data);
  });

  it('throws an error when the data is incorrect size', () => {
    // Arrange
    const data = Uint8Array.from([0x00]);

    // Act
    expect(() => deserializeMasterSeedValue(data)).toThrowError(
      'Invalid master seed length. Expected 32 bytes, got 1',
    );

    // Assert
    // Nothing to assert.
  });
});
