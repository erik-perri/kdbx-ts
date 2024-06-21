import SymmetricCipherMode from '../enums/SymmetricCipherMode';

const symmetricCipherModeDisplayMap: Record<SymmetricCipherMode, string> = {
  [SymmetricCipherMode.Aes128_CBC]: 'AES-128-CBC',
  [SymmetricCipherMode.Aes256_CBC]: 'AES-256-CBC',
  [SymmetricCipherMode.ChaCha20]: 'ChaCha20',
  [SymmetricCipherMode.Salsa20]: 'Salsa20',
  [SymmetricCipherMode.Twofish_CBC]: 'Twofish-CBC',
};

export default function displaySymmetricCipherMode(
  mode: SymmetricCipherMode,
): string {
  return symmetricCipherModeDisplayMap[mode];
}
