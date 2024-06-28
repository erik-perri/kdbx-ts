import { Chacha20 } from 'ts-chacha20';

import { type SymmetricCipher } from '../../src/dependencies';
import SymmetricCipherDirection from '../../src/enums/SymmetricCipherDirection';

export default async function createChaCha20Cipher(
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  iv: Uint8Array,
): Promise<SymmetricCipher> {
  let cipher: Chacha20 | undefined = new Chacha20(key, iv);

  return Promise.resolve({
    finish(data): Promise<Uint8Array> {
      if (!cipher) {
        throw new Error('Cipher is no longer available');
      }

      const result =
        direction === SymmetricCipherDirection.Encrypt
          ? cipher.encrypt(data)
          : cipher.decrypt(data);

      cipher = undefined;

      return Promise.resolve(result);
    },
    process(data): Promise<Uint8Array> {
      if (!cipher) {
        throw new Error('Cipher is no longer available');
      }

      const result =
        direction === SymmetricCipherDirection.Encrypt
          ? cipher.encrypt(data)
          : cipher.decrypt(data);

      return Promise.resolve(result);
    },
  });
}
