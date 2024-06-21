import { describe, expect, it, vitest } from 'vitest';

import nodeCrypto from '../../fixtures/crypto/nodeCrypto';
import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import displaySymmetricCipherAlgorithm from '../utilities/displaySymmetricCipherAlgorithm';
import createInnerStreamCipher from './createInnerStreamCipher';

describe('createInnerStreamCipher', () => {
  it('should use the expected nonce when using salsa20', async () => {
    // K should consist of 32 bytes. The key for Salsa20 is SHA-256(K), and the nonce is
    // (0xE8, 0x30, 0x09, 0x4B, 0x97, 0x20, 0x5D, 0x2A).

    // Arrange
    const key = Uint8Array.from(
      Array.from({ length: 32 }, (_, index) => index),
    );

    const createCipherSpy = vitest
      .spyOn(nodeCrypto, 'createCipher')
      .mockResolvedValue({
        process: () => Promise.resolve(Uint8Array.from([])),
        finish: () => Promise.resolve(Uint8Array.from([])),
      });

    // Act
    await createInnerStreamCipher(
      nodeCrypto,
      SymmetricCipherAlgorithm.Salsa20,
      key,
    );

    // Assert
    expect(createCipherSpy).toHaveBeenCalledTimes(1);
    expect(createCipherSpy).toHaveBeenCalledWith(
      SymmetricCipherAlgorithm.Salsa20,
      SymmetricCipherDirection.Encrypt,
      await nodeCrypto.hash(HashAlgorithm.Sha256, [key]),
      Uint8Array.from([0xe8, 0x30, 0x09, 0x4b, 0x97, 0x20, 0x5d, 0x2a]),
    );
  });

  it('should use sha52 and the expected nonce when using chacha20', async () => {
    // K should consist of 64 bytes. Compute H := SHA-512(K). The key for ChaCha20 is
    // (H[0], ..., H[31]), and the nonce is (H[32], ..., H[43]).

    // Arrange
    const key = Uint8Array.from(
      Array.from({ length: 64 }, (_, index) => index),
    );

    const keyHash = await nodeCrypto.hash(HashAlgorithm.Sha512, [key]);

    const createCipherSpy = vitest
      .spyOn(nodeCrypto, 'createCipher')
      .mockResolvedValue({
        process: () => Promise.resolve(Uint8Array.from([])),
        finish: () => Promise.resolve(Uint8Array.from([])),
      });

    // Act
    await createInnerStreamCipher(
      nodeCrypto,
      SymmetricCipherAlgorithm.ChaCha20,
      key,
    );

    // Assert
    expect(createCipherSpy).toHaveBeenCalledTimes(1);
    expect(createCipherSpy).toHaveBeenCalledWith(
      SymmetricCipherAlgorithm.ChaCha20,
      SymmetricCipherDirection.Encrypt,
      keyHash.subarray(0, 32),
      keyHash.subarray(32, 44),
    );
  });

  it.each([
    [SymmetricCipherAlgorithm.Aes128_CBC],
    [SymmetricCipherAlgorithm.Aes256_CBC],
    [SymmetricCipherAlgorithm.Twofish_CBC],
  ])(`should throw an error when using %s`, async (algorithm) => {
    // Arrange
    const key = Uint8Array.from(
      Array.from({ length: 64 }, (_, index) => index),
    );

    // Act
    await expect(
      createInnerStreamCipher(nodeCrypto, algorithm, key),
    ).rejects.toThrow(
      `Invalid inner stream cipher algorithm ${displaySymmetricCipherAlgorithm(algorithm)}`,
    );

    // Assert
    // Nothing to assert.
  });
});
