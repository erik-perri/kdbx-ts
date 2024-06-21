import { describe, expect, it } from 'vitest';

import SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import SymmetricCipherUuid from '../../enums/SymmetricCipherUuid';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeCipherIdValue from './deserializeCipherIdValue';

describe('deserializeCipherIdValue', () => {
  it.each([
    [
      'Aes128',
      {
        expected: SymmetricCipherMode.Aes128_CBC,
        uuid: SymmetricCipherUuid.Aes128,
      },
    ],
    [
      'Aes256',
      {
        expected: SymmetricCipherMode.Aes256_CBC,
        uuid: SymmetricCipherUuid.Aes256,
      },
    ],
    [
      'Twofish',
      {
        expected: SymmetricCipherMode.Twofish_CBC,
        uuid: SymmetricCipherUuid.Twofish,
      },
    ],
    [
      'ChaCha20',
      {
        expected: SymmetricCipherMode.ChaCha20,
        uuid: SymmetricCipherUuid.ChaCha20,
      },
    ],
  ])(
    'converts algorithm %s UUID to cipher mode during deserialize',
    (_, { expected, uuid }) => {
      // Arrange
      const data = Uint8ArrayHelper.fromUuid(uuid);

      // Act
      const result = deserializeCipherIdValue(data);

      // Assert
      expect(result).toEqual(expected);
    },
  );

  it('throws error when the data is the wrong size', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt8(1);

    // Act
    expect(() => deserializeCipherIdValue(data)).toThrowError(
      'Invalid cipher ID length. Expected 16 bytes, got 1',
    );

    // Assert
    // Nothing to assert.
  });

  it('throws error when the cipher ID is invalid', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUuid(
      '00000000-0000-0000-0000-000000000000',
      false,
    );

    // Act
    expect(() => deserializeCipherIdValue(data)).toThrowError(
      'Unsupported cipher "00000000-0000-0000-0000-000000000000"',
    );

    // Assert
    // Nothing to assert.
  });
});
