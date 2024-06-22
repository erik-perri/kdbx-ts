import { describe, expect, it, vitest } from 'vitest';

import nodeCrypto from '../../fixtures/crypto/nodeCrypto';
import HashAlgorithm from '../enums/HashAlgorithm';
import KdfUuid from '../enums/KdfUuid';
import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import createPasswordKey from '../keys/createPasswordKey';
import { KeePass2 } from '../versions';
import cryptInnerData from './cryptInnerData';
import transformCompositeKey from './transformCompositeKey';

describe('cryptInnerData', () => {
  it.each([
    [
      'encrypt aes256-cbc',
      {
        algorithm: SymmetricCipherAlgorithm.Aes256_CBC,
        data: Uint8Array.from([0x03, 0x02, 0x01]),
        direction: SymmetricCipherDirection.Encrypt,
        expected: Uint8Array.from([
          0xcf, 0x4d, 0xf2, 0x5d, 0x8d, 0x25, 0x7a, 0x3f, 0xf8, 0xe7, 0x40,
          0x8c, 0x77, 0x95, 0xa4, 0x22,
        ]),
      },
    ],
    [
      'decrypt aes256-cbc',
      {
        algorithm: SymmetricCipherAlgorithm.Aes256_CBC,
        data: Uint8Array.from([
          0xcf, 0x4d, 0xf2, 0x5d, 0x8d, 0x25, 0x7a, 0x3f, 0xf8, 0xe7, 0x40,
          0x8c, 0x77, 0x95, 0xa4, 0x22,
        ]),
        direction: SymmetricCipherDirection.Decrypt,
        expected: Uint8Array.from([0x03, 0x02, 0x01]),
      },
    ],
  ])(
    'should hash the key and create a cipher with the expected options to %s',
    async (_, { algorithm, data, direction, expected }) => {
      // Arrange
      const masterSeed = new Uint8Array(32);
      const encryptionIV = new Uint8Array(16);
      const compositeKey = await transformCompositeKey(
        nodeCrypto,
        {
          uuid: KdfUuid.AesKdbx4,
          variantMapVersion: KeePass2.variantMapVersion,
          rounds: BigInt(10),
          seed: new Uint8Array(32),
        },
        [await createPasswordKey(nodeCrypto, 'password')],
      );

      const hashSpy = vitest.spyOn(nodeCrypto, 'hash');

      // Act
      const result = await cryptInnerData(
        nodeCrypto,
        direction,
        algorithm,
        masterSeed,
        encryptionIV,
        compositeKey,
        data,
      );

      // Assert
      expect(result).toEqual(expected);
      expect(hashSpy).toHaveBeenCalledTimes(1);
      expect(hashSpy).toHaveBeenCalledWith(HashAlgorithm.Sha256, [
        masterSeed,
        compositeKey,
      ]);
    },
  );
});
