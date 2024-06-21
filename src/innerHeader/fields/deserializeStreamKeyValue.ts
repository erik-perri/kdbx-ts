import SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import displaySymmetricCipherMode from '../../utilities/displaySymmetricCipherMode';
import getSymmetricCipherKeySize from '../../utilities/getSymmetricCipherKeySize';

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

    const expectedBytes = getSymmetricCipherKeySize(type);
    if (data.byteLength !== expectedBytes) {
      throw new Error(
        `Invalid ${displaySymmetricCipherMode(type)} key length. Expected ${expectedBytes} bytes, got ${data.byteLength}`,
      );
    }
  }

  return data;
}
