import { describe, expect, it } from 'vitest';

import ProtectedStreamAlgorithm from '../../enums/ProtectedStreamAlgorithm';
import SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeStreamCipherAlgorithmValue from './deserializeStreamCipherAlgorithmValue';

describe('deserializeStreamCipherAlgorithmValue', () => {
  it.each([
    [
      'Salsa20',
      {
        expected: SymmetricCipherAlgorithm.Salsa20,
        value: ProtectedStreamAlgorithm.Salsa20,
      },
    ],
    [
      'ChaCha20',
      {
        expected: SymmetricCipherAlgorithm.ChaCha20,
        value: ProtectedStreamAlgorithm.ChaCha20,
      },
    ],
  ])(
    'converts stream algorithm %s to cipher algorithm during deserialize',
    (_, { expected, value }) => {
      // Arrange
      const data = Uint8ArrayHelper.fromUInt32LE(value);

      // Act
      const result = deserializeStreamCipherAlgorithmValue(data);

      // Assert
      expect(result).toEqual(expected);
    },
  );

  it('throws an error if the data is incorrect size', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt8(1);

    // Act
    expect(() => deserializeStreamCipherAlgorithmValue(data)).toThrowError(
      'Invalid stream cipher algorithm length. Expected 4 bytes, got 1',
    );

    // Assert
    // Nothing to assert.
  });

  it('throws an error if the stream cipher algorithm is invalid', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt32LE(1); // ArcFourVariant

    // Act
    expect(() => deserializeStreamCipherAlgorithmValue(data)).toThrowError(
      'Invalid stream cipher algorithm "1"',
    );

    // Assert
    // Nothing to assert.
  });
});
