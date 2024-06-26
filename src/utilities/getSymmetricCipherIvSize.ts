import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';

export default function getSymmetricCipherIvSize(
  algorithm: SymmetricCipherAlgorithm,
): number {
  switch (algorithm) {
    case SymmetricCipherAlgorithm.Aes256_CBC:
    case SymmetricCipherAlgorithm.Twofish_CBC:
      return 16;
    case SymmetricCipherAlgorithm.Salsa20:
    case SymmetricCipherAlgorithm.ChaCha20:
      return 12;
  }
}
