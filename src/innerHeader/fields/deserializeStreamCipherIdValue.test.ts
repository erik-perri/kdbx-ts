import { describe, expect, it } from 'vitest';

import ProtectedStreamAlgorithm from '../../enums/ProtectedStreamAlgorithm';
import SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeStreamCipherIdValue from './deserializeStreamCipherIdValue';

describe('deserializeStreamCipherIdValue', () => {
  it.each([
    [
      'Salsa20',
      {
        expected: SymmetricCipherMode.Salsa20,
        value: ProtectedStreamAlgorithm.Salsa20,
      },
    ],
    [
      'ChaCha20',
      {
        expected: SymmetricCipherMode.ChaCha20,
        value: ProtectedStreamAlgorithm.ChaCha20,
      },
    ],
  ])(
    'converts stream algorithm %s to cipher mode during deserialize',
    (_, { expected, value }) => {
      // Arrange
      const data = Uint8ArrayHelper.fromUInt32LE(value);

      // Act
      const result = deserializeStreamCipherIdValue(data);

      // Assert
      expect(result).toEqual(expected);
    },
  );

  it('throws an error if the data is incorrect size', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt8(1);

    // Act
    expect(() => deserializeStreamCipherIdValue(data)).toThrowError(
      'Invalid stream cipher ID length. Expected 4 bytes, got 1',
    );

    // Assert
    // Nothing to assert.
  });

  it('throws an error if the stream cipher ID is invalid', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt32LE(1); // ArcFourVariant

    // Act
    expect(() => deserializeStreamCipherIdValue(data)).toThrowError(
      'Invalid stream cipher ID "1"',
    );

    // Assert
    // Nothing to assert.
  });
});
