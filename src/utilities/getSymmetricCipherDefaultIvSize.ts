import SymmetricCipherMode from '../enums/SymmetricCipherMode';

export default function getSymmetricCipherDefaultIvSize(
  mode: SymmetricCipherMode,
): number {
  switch (mode) {
    case SymmetricCipherMode.Aes128_CBC:
    case SymmetricCipherMode.Aes256_CBC:
    case SymmetricCipherMode.Aes128_CTR:
    case SymmetricCipherMode.Aes256_CTR:
    case SymmetricCipherMode.Aes256_GCM:
    case SymmetricCipherMode.Twofish_CBC:
      return 16;
    case SymmetricCipherMode.Salsa20:
    case SymmetricCipherMode.ChaCha20:
      return 12;
    case SymmetricCipherMode.InvalidMode:
      throw new Error(
        `Unable to determine default IV size for invalid cipher mode`,
      );
  }
}
