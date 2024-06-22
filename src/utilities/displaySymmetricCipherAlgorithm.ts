import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';

const algorithmDisplayMap: Record<SymmetricCipherAlgorithm, string> = {
  [SymmetricCipherAlgorithm.Aes256_CBC]: 'AES-256-CBC',
  [SymmetricCipherAlgorithm.ChaCha20]: 'ChaCha20',
  [SymmetricCipherAlgorithm.Salsa20]: 'Salsa20',
  [SymmetricCipherAlgorithm.Twofish_CBC]: 'Twofish-CBC',
};

export default function displaySymmetricCipherAlgorithm(
  algorithm: SymmetricCipherAlgorithm,
): string {
  return algorithmDisplayMap[algorithm];
}
