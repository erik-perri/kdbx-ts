import { describe, expect, it } from 'vitest';

import SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeStreamKeyValue from './deserializeStreamKeyValue';

describe('deserializeStreamKeyValue', () => {
  it('allows any size when algorithm is unknown', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt32LE(1);

    // Act
    const result = deserializeStreamKeyValue(data);

    // Assert
    expect(result).toEqual(data);
  });

  it.each([
    [
      'ChaCha20',
      {
        algorithm: SymmetricCipherAlgorithm.ChaCha20,
        value: Uint8ArrayHelper.fromString('Test'.repeat(16)),
      },
    ],
    [
      'Salsa20',
      {
        algorithm: SymmetricCipherAlgorithm.Salsa20,
        value: Uint8ArrayHelper.fromString('Test'.repeat(8)),
      },
    ],
  ])('does not modify data for %s', (_, { algorithm, value }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = deserializeStreamKeyValue(value, algorithm);

    // Assert
    expect(result).toEqual(value);
  });

  it.each([
    [
      'ChaCha20',
      {
        algorithm: SymmetricCipherAlgorithm.ChaCha20,
        expected: 'Invalid ChaCha20 key length. Expected 64 bytes, got 4',
      },
    ],
    [
      'Salsa20',
      {
        algorithm: SymmetricCipherAlgorithm.Salsa20,
        expected: 'Invalid Salsa20 key length. Expected 32 bytes, got 4',
      },
    ],
  ])(
    'throws error when %s type is used with incorrect size',
    (_, { algorithm, expected }) => {
      // Arrange
      const data = Uint8ArrayHelper.fromUInt32LE(1);

      // Act
      expect(() => deserializeStreamKeyValue(data, algorithm)).toThrowError(
        expected,
      );

      // Assert
      // Nothing to assert.
    },
  );

  it('throws error when type is unsupported', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt32LE(1);

    // Act
    expect(() =>
      deserializeStreamKeyValue(data, SymmetricCipherAlgorithm.Aes128_CBC),
    ).toThrowError('Unsupported symmetric cipher algorithm "AES-128-CBC"');

    // Assert
    // Nothing to assert.
  });
});
