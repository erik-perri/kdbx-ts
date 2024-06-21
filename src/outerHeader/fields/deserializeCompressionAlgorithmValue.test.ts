import { describe, expect, it } from 'vitest';

import CompressionAlgorithm from '../../enums/CompressionAlgorithm';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeCompressionAlgorithmValue from './deserializeCompressionAlgorithmValue';

describe('deserializeCompressionAlgorithmValue', () => {
  it.each([
    [
      'None',
      {
        value: CompressionAlgorithm.None,
      },
    ],
    [
      'GZip',
      {
        value: CompressionAlgorithm.GZip,
      },
    ],
  ])('converts algorithm %s to enum during deserialize', (_, { value }) => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt32LE(value);

    // Act
    const result = deserializeCompressionAlgorithmValue(data);

    // Assert
    expect(result).toEqual(value);
  });

  it('throws error when the data is the wrong size', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt8(1);

    // Act
    expect(() => deserializeCompressionAlgorithmValue(data)).toThrowError(
      'Invalid compression algorithm length. Expected 4 bytes, got 1',
    );

    // Assert
    // Nothing to assert.
  });

  it('throws error when the algorithm is invalid', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt32LE(2);

    // Act
    expect(() => deserializeCompressionAlgorithmValue(data)).toThrowError(
      'Unsupported compression algorithm "2"',
    );

    // Assert
    // Nothing to assert.
  });
});
