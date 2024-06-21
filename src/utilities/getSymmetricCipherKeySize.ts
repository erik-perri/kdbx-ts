import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import displaySymmetricCipherMode from './displaySymmetricCipherMode';

export default function getSymmetricCipherKeySize(
  mode: SymmetricCipherMode,
): number {
  switch (mode) {
    case SymmetricCipherMode.ChaCha20:
      return 64;
    case SymmetricCipherMode.Salsa20:
      return 32;
    default:
      throw new Error(
        `Unknown expected key size for cipher mode "${displaySymmetricCipherMode(mode)}"`,
      );
  }
}
