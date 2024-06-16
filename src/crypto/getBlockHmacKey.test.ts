import { describe, expect, it, vitest } from 'vitest';

import nodeCrypto from '../../fixtures/crypto/nodeCrypto';
import HashAlgorithm from '../enums/HashAlgorithm';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import getBlockHmacKey from './getBlockHmacKey';

describe('getBlockHmacKey', () => {
  it.each([
    [
      // The key for the HMAC-SHA-256 hash of the header is:
      // SHA-512(0xFFFFFFFFFFFFFFFF ‖ SHA-512(S ‖ T ‖ 0x01)).
      'header',
      {
        blockIndex: null,
        expectedPart: BigInt('0xffffffffffffffff'),
      },
    ],
    [
      // The key for the HMAC-SHA-256 hash of the i-th block (zero-based index, type UInt64)
      // of the HMAC-protected block stream is: SHA-512(i ‖ SHA-512(S ‖ T ‖ 0x01)).
      'block',
      {
        blockIndex: BigInt(0),
        expectedPart: BigInt(0),
      },
    ],
  ])(
    'should hash using the expected pattern when generating for %s',
    async (_, { blockIndex, expectedPart }) => {
      // Arrange
      const key = Uint8Array.from(
        Array.from({ length: 64 }, (_, index) => index),
      );

      const hashSpy = vitest
        .spyOn(nodeCrypto, 'hash')
        .mockResolvedValue(Uint8Array.from([]));

      // Act
      await getBlockHmacKey(nodeCrypto, blockIndex, key);

      // Assert
      expect(hashSpy).toHaveBeenCalledTimes(1);
      expect(hashSpy).toHaveBeenCalledWith(HashAlgorithm.Sha512, [
        Uint8ArrayHelper.fromUInt64LE(expectedPart),
        key,
      ]);
    },
  );
});
