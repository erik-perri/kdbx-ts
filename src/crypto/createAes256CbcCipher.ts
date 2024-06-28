import crypto from 'crypto';

import { type SymmetricCipher } from '../dependencies';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';

export default async function createAes256CbcCipher(
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  iv: Uint8Array,
): Promise<SymmetricCipher> {
  const cipher: crypto.Cipher | crypto.Decipher =
    direction === SymmetricCipherDirection.Encrypt
      ? crypto.createCipheriv('aes-256-cbc', key, iv).setAutoPadding(true)
      : crypto.createDecipheriv('aes-256-cbc', key, iv).setAutoPadding(true);

  return Promise.resolve({
    process(data): Promise<Uint8Array> {
      return Promise.resolve(new Uint8Array(cipher.update(data)));
    },
    finish(data): Promise<Uint8Array> {
      return Promise.resolve(
        Uint8Array.from(Buffer.concat([cipher.update(data), cipher.final()])),
      );
    },
  });
}
