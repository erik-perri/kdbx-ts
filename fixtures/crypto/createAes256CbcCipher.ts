import crypto from 'crypto';

import SymmetricCipherDirection from '../../src/enums/SymmetricCipherDirection';
import { type CryptoCipher } from '../../src/types/crypto';

export default function createAes256CbcCipher(
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  iv: Uint8Array,
): CryptoCipher {
  let cipher: crypto.Cipher | crypto.Decipher | undefined =
    direction === SymmetricCipherDirection.Encrypt
      ? crypto.createCipheriv('aes-256-cbc', key, iv).setAutoPadding(true)
      : crypto.createDecipheriv('aes-256-cbc', key, iv).setAutoPadding(true);

  return {
    process(data): Promise<Uint8Array> {
      if (!cipher) {
        throw new Error('Cipher is no longer available');
      }

      return Promise.resolve(new Uint8Array(cipher.update(data)));
    },
    finish(data): Promise<Uint8Array> {
      if (!cipher) {
        throw new Error('Cipher is no longer available');
      }

      const result = Buffer.concat([cipher.update(data), cipher.final()]);

      cipher = undefined;

      return Promise.resolve(new Uint8Array(result));
    },
  };
}
