import * as argon2 from 'argon2';
import crypto from 'crypto';

import type { CryptoCipher, CryptoImplementation } from './crypto/types';
import HashAlgorithm from './enums/HashAlgorithm';
import SymmetricCipherMode from './enums/SymmetricCipherMode';
import displaySymmetricCipherMode from './utilities/displaySymmetricCipherMode';

const nodeCrypto: CryptoImplementation = {
  async hash(algorithm, data) {
    const hash = crypto.createHash(
      algorithm === HashAlgorithm.Sha256 ? 'sha256' : 'sha512',
    );

    data.forEach((datum) => hash.update(datum));

    return Promise.resolve(hash.digest());
  },

  async hmac(algorithm, key, data) {
    const hmac = crypto.createHmac(
      algorithm === HashAlgorithm.Sha256 ? 'sha256' : 'sha512',
      Uint8Array.from(key),
    );

    data.forEach((datum) => hmac.update(datum));

    return Promise.resolve(hmac.digest());
  },

  async createCipher(mode, direction, key, iv): Promise<CryptoCipher> {
    switch (mode) {
      case SymmetricCipherMode.Aes256_CBC: {
        let cipher: crypto.Decipher | undefined = crypto
          .createDecipheriv('aes-256-cbc', key, iv)
          .setAutoPadding(true);

        return Promise.resolve({
          async process(data): Promise<Uint8Array> {
            if (!cipher) {
              throw new Error('Cipher is no longer available');
            }

            return Promise.resolve(Uint8Array.from(cipher.update(data)));
          },
          async finish(data): Promise<Uint8Array> {
            if (!cipher) {
              throw new Error('Cipher is no longer available');
            }

            const result = Uint8Array.from([
              ...cipher.update(data),
              ...cipher.final(),
            ]);

            cipher = undefined;

            return Promise.resolve(result);
          },
        });
      }
      default:
        throw new Error(
          `Cipher ${displaySymmetricCipherMode(mode)} (${mode}) not mocked`,
        );
    }
  },

  async transformAesKdfKey(key, seed, iterations) {
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
    memory,
    parallelism,
    iterations,
  ) {
    const encodedHash = await argon2.hash(Buffer.from(key), {
      memoryCost: Number(memory),
      parallelism: Number(parallelism),
      salt,
      timeCost: Number(iterations),
      type,
      version,
      raw: true,
    });

    return Uint8Array.from(encodedHash);
  },
};

export default nodeCrypto;
