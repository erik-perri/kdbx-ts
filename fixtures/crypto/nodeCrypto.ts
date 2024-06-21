import * as argon2 from 'argon2';
import crypto from 'crypto';

import type {
  CryptoCipher,
  CryptoImplementation,
} from '../../src/crypto/types';
import SymmetricCipherAlgorithm from '../../src/enums/SymmetricCipherAlgorithm';
import type SymmetricCipherDirection from '../../src/enums/SymmetricCipherDirection';
import displaySymmetricCipherAlgorithm from '../../src/utilities/displaySymmetricCipherAlgorithm';
import createAes256CbcCipher from './createAes256CbcCipher';
import createChaCha20Cipher from './createChaCha20Cipher';
import createTwofishCbcCipher from './createTwofishCbcCipher';

type CipherFactory = (
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  iv: Uint8Array,
) => CryptoCipher;

const nodeCrypto: CryptoImplementation = {
  createCipher(algorithm, direction, key, iv): Promise<CryptoCipher> {
    const cipherMap: Record<string, CipherFactory | undefined> = {
      [SymmetricCipherAlgorithm.Aes256_CBC]: createAes256CbcCipher,
      [SymmetricCipherAlgorithm.ChaCha20]: createChaCha20Cipher,
      [SymmetricCipherAlgorithm.Twofish_CBC]: createTwofishCbcCipher,
    };

    const cipherFactory = cipherMap[algorithm];

    if (!cipherFactory) {
      throw new Error(
        `Cipher ${displaySymmetricCipherAlgorithm(algorithm)} not available`,
      );
    }

    return Promise.resolve(cipherFactory(direction, key, iv));
  },

  hash(algorithm, data) {
    const hash = crypto.createHash(algorithm);

    data.forEach((datum) => hash.update(datum));

    return Promise.resolve(hash.digest());
  },

  hmac(algorithm, key, data) {
    const hmac = crypto.createHmac(algorithm, Uint8Array.from(key));

    data.forEach((datum) => hmac.update(datum));

    return Promise.resolve(hmac.digest());
  },

  randomBytes(length) {
    return Promise.resolve(crypto.randomBytes(length));
  },

  transformAesKdfKey(key, seed, iterations) {
    let result = Uint8Array.from(key);

    if (Array.isArray(seed)) {
      seed = Uint8Array.from(seed);
    }

    while (iterations--) {
      const cipher = crypto
        .createCipheriv('aes-256-ecb', seed, Buffer.alloc(0))
        .setAutoPadding(false);
      result = Buffer.concat([cipher.update(result), cipher.final()]);
    }

    return Promise.resolve(result);
  },

  async transformArgon2KdfKey(
    key,
    salt,
    version,
    type,
    memoryInKibibytes,
    parallelism,
    iterations,
  ) {
    return Uint8Array.from(
      await argon2.hash(Buffer.from(key), {
        memoryCost: Number(memoryInKibibytes),
        parallelism: Number(parallelism),
        salt,
        timeCost: Number(iterations),
        type,
        version,
        raw: true,
      }),
    );
  },
};

export default nodeCrypto;
