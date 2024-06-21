import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import displaySymmetricCipherAlgorithm from './displaySymmetricCipherAlgorithm';

export default function getSymmetricCipherKeySize(
  algorithm: SymmetricCipherAlgorithm,
): number {
  switch (algorithm) {
    case SymmetricCipherAlgorithm.ChaCha20:
      return 64;
    case SymmetricCipherAlgorithm.Salsa20:
      return 32;
    default:
      throw new Error(
        `Unknown expected key size for cipher algorithm "${displaySymmetricCipherAlgorithm(algorithm)}"`,
      );
  }
}
