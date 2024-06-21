import { describe, expect, it } from 'vitest';

import SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeStreamKeyValue from './deserializeStreamKeyValue';

describe('deserializeStreamKeyValue', () => {
  it('allows any size when mode is unknown', () => {
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
        mode: SymmetricCipherMode.ChaCha20,
        value: Uint8ArrayHelper.fromString('Test'.repeat(16)),
      },
    ],
    [
      'Salsa20',
      {
        mode: SymmetricCipherMode.Salsa20,
        value: Uint8ArrayHelper.fromString('Test'.repeat(8)),
      },
    ],
  ])('does not modify data for %s', (_, { mode, value }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = deserializeStreamKeyValue(value, mode);

    // Assert
    expect(result).toEqual(value);
  });

  it.each([
    [
      'ChaCha20',
      {
        expected: 'Invalid ChaCha20 key length. Expected 64 bytes, got 4',
        mode: SymmetricCipherMode.ChaCha20,
      },
    ],
    [
      'Salsa20',
      {
        expected: 'Invalid Salsa20 key length. Expected 32 bytes, got 4',
        mode: SymmetricCipherMode.Salsa20,
      },
    ],
  ])(
    'throws error when %s type is used with incorrect size',
    (_, { expected, mode }) => {
      // Arrange
      const data = Uint8ArrayHelper.fromUInt32LE(1);

      // Act
      expect(() => deserializeStreamKeyValue(data, mode)).toThrowError(
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
      deserializeStreamKeyValue(data, SymmetricCipherMode.Aes128_CBC),
    ).toThrowError('Unsupported symmetric cipher mode "AES-128-CBC"');

    // Assert
    // Nothing to assert.
  });
});
