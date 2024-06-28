import { getDependency, type SymmetricCipher } from '../dependencies';
import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import type SymmetricCipherDirection from '../enums/SymmetricCipherDirection';

const ciphers = Object.freeze({
  [SymmetricCipherAlgorithm.Aes256_CBC]: 'cipherAes256',
  [SymmetricCipherAlgorithm.ChaCha20]: 'cipherChaCha20',
  [SymmetricCipherAlgorithm.Salsa20]: 'cipherSalsa20',
  [SymmetricCipherAlgorithm.Twofish_CBC]: 'cipherTwofish',
} as const);

export default function createSymmetricCipher(
  algorithm: SymmetricCipherAlgorithm,
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  iv: Uint8Array,
): Promise<SymmetricCipher> {
  return getDependency(ciphers[algorithm])(direction, key, iv);
}
