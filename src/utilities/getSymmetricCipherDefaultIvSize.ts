import SymmetricCipherMode from '../enums/SymmetricCipherMode';

export default function getSymmetricCipherDefaultIvSize(
  mode: SymmetricCipherMode,
): number {
  switch (mode) {
    case SymmetricCipherMode.Aes128_CBC:
    case SymmetricCipherMode.Aes256_CBC:
    case SymmetricCipherMode.Twofish_CBC:
      return 16;
    case SymmetricCipherMode.Salsa20:
    case SymmetricCipherMode.ChaCha20:
      return 12;
  }
}
