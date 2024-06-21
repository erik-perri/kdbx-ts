import { describe, expect, it } from 'vitest';

import SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import SymmetricCipherUuid from '../../enums/SymmetricCipherUuid';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeCipherAlgorithmValue from './deserializeCipherAlgorithmValue';

describe('deserializeCipherAlgorithmValue', () => {
  it.each([
    [
      'Aes128',
      {
        expected: SymmetricCipherAlgorithm.Aes128_CBC,
        uuid: SymmetricCipherUuid.Aes128,
      },
    ],
    [
      'Aes256',
      {
        expected: SymmetricCipherAlgorithm.Aes256_CBC,
        uuid: SymmetricCipherUuid.Aes256,
      },
    ],
    [
      'Twofish',
      {
        expected: SymmetricCipherAlgorithm.Twofish_CBC,
        uuid: SymmetricCipherUuid.Twofish,
      },
    ],
    [
      'ChaCha20',
      {
        expected: SymmetricCipherAlgorithm.ChaCha20,
        uuid: SymmetricCipherUuid.ChaCha20,
      },
    ],
  ])(
    'converts algorithm %s UUID to cipher algorithm during deserialize',
    (_, { expected, uuid }) => {
      // Arrange
      const data = Uint8ArrayHelper.fromUuid(uuid);

      // Act
      const result = deserializeCipherAlgorithmValue(data);

      // Assert
      expect(result).toEqual(expected);
    },
  );

  it('throws error when the data is the wrong size', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUInt8(1);

    // Act
    expect(() => deserializeCipherAlgorithmValue(data)).toThrowError(
      'Invalid cipher algorithm length. Expected 16 bytes, got 1',
    );

    // Assert
    // Nothing to assert.
  });

  it('throws error when the cipher algorithm is invalid', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromUuid(
      '00000000-0000-0000-0000-000000000000',
      false,
    );

    // Act
    expect(() => deserializeCipherAlgorithmValue(data)).toThrowError(
      'Unsupported cipher "00000000-0000-0000-0000-000000000000"',
    );

    // Assert
    // Nothing to assert.
  });
});
