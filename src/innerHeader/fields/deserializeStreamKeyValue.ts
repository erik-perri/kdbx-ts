import SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import displaySymmetricCipherMode from '../../utilities/displaySymmetricCipherMode';

export default function deserializeStreamKeyValue(
  data: Uint8Array,
  type?: SymmetricCipherMode,
): Uint8Array {
  if (type !== undefined) {
    if (
      type !== SymmetricCipherMode.Salsa20 &&
      type !== SymmetricCipherMode.ChaCha20
    ) {
      throw new Error(
        `Unsupported symmetric cipher mode "${displaySymmetricCipherMode(type)}"`,
      );
    }

    switch (type) {
      case SymmetricCipherMode.Salsa20:
        if (data.byteLength !== 32) {
          throw new Error(
            `Invalid Salsa20 key length. Expected 32 bytes, got ${data.byteLength}`,
          );
        }
        break;

      case SymmetricCipherMode.ChaCha20:
        if (data.byteLength !== 64) {
          throw new Error(
            `Invalid ChaCha20 key length. Expected 64 bytes, got ${data.byteLength}`,
          );
        }
        break;
    }
  }

  return data;
}
