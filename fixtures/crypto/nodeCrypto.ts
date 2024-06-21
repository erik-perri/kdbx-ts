import * as argon2 from 'argon2';
import crypto from 'crypto';

import type {
  CryptoCipher,
  CryptoImplementation,
} from '../../src/crypto/types';
import type SymmetricCipherDirection from '../../src/enums/SymmetricCipherDirection';
import SymmetricCipherMode from '../../src/enums/SymmetricCipherMode';
import displaySymmetricCipherMode from '../../src/utilities/displaySymmetricCipherMode';
import createAes256CbcCipher from './createAes256CbcCipher';
import createChaCha20Cipher from './createChaCha20Cipher';
import createTwofishCbcCipher from './createTwofishCbcCipher';

type CipherFactory = (
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  iv: Uint8Array,
) => CryptoCipher;

const nodeCrypto: CryptoImplementation = {
  createCipher(mode, direction, key, iv): Promise<CryptoCipher> {
    const cipherMap: Record<string, CipherFactory | undefined> = {
      [SymmetricCipherMode.Aes256_CBC]: createAes256CbcCipher,
      [SymmetricCipherMode.ChaCha20]: createChaCha20Cipher,
      [SymmetricCipherMode.Twofish_CBC]: createTwofishCbcCipher,
    };

    const cipherFactory = cipherMap[mode];

    if (!cipherFactory) {
      throw new Error(`Cipher ${displaySymmetricCipherMode(mode)} not mocked`);
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
