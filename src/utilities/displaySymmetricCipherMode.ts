import SymmetricCipherMode from '../enums/SymmetricCipherMode';

const symmetricCipherModeDisplayMap: Record<SymmetricCipherMode, string> = {
  [SymmetricCipherMode.Aes128_CBC]: 'Aes128_CBC',
  [SymmetricCipherMode.Aes256_CBC]: 'Aes256_CBC',
  [SymmetricCipherMode.Aes128_CTR]: 'Aes128_CTR',
  [SymmetricCipherMode.Aes256_CTR]: 'Aes256_CTR',
  [SymmetricCipherMode.Twofish_CBC]: 'Twofish_CBC',
  [SymmetricCipherMode.ChaCha20]: 'ChaCha20',
  [SymmetricCipherMode.Salsa20]: 'Salsa20',
  [SymmetricCipherMode.Aes256_GCM]: 'Aes256_GCM',
  [SymmetricCipherMode.InvalidMode]: 'InvalidMode',
};

export default function displaySymmetricCipherMode(
  mode: SymmetricCipherMode,
): string {
  return symmetricCipherModeDisplayMap[mode];
}
