import { describe, expect, it, vitest } from 'vitest';

import nodeCrypto from '../../fixtures/crypto/nodeCrypto';
import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import displaySymmetricCipherMode from '../utilities/displaySymmetricCipherMode';
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
    await createInnerStreamCipher(nodeCrypto, SymmetricCipherMode.Salsa20, key);

    // Assert
    expect(createCipherSpy).toHaveBeenCalledTimes(1);
    expect(createCipherSpy).toHaveBeenCalledWith(
      SymmetricCipherMode.Salsa20,
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
      SymmetricCipherMode.ChaCha20,
      key,
    );

    // Assert
    expect(createCipherSpy).toHaveBeenCalledTimes(1);
    expect(createCipherSpy).toHaveBeenCalledWith(
      SymmetricCipherMode.ChaCha20,
      SymmetricCipherDirection.Encrypt,
      keyHash.subarray(0, 32),
      keyHash.subarray(32, 44),
    );
  });

  it.each([
    [SymmetricCipherMode.Aes128_CBC],
    [SymmetricCipherMode.Aes256_CBC],
    [SymmetricCipherMode.Aes128_CTR],
    [SymmetricCipherMode.Aes256_CTR],
    [SymmetricCipherMode.Twofish_CBC],
    [SymmetricCipherMode.Aes256_GCM],
    [SymmetricCipherMode.InvalidMode],
  ])(`should throw an error when using %s`, async (mode) => {
    // Arrange
    const key = Uint8Array.from(
      Array.from({ length: 64 }, (_, index) => index),
    );

    // Act
    await expect(
      createInnerStreamCipher(nodeCrypto, mode, key),
    ).rejects.toThrow(
      `Invalid inner stream cipher mode ${displaySymmetricCipherMode(mode)}`,
    );

    // Assert
    // Nothing to assert.
  });
});
