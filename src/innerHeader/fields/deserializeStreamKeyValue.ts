import SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import displaySymmetricCipherAlgorithm from '../../utilities/displaySymmetricCipherAlgorithm';
import getSymmetricCipherKeySize from '../../utilities/getSymmetricCipherKeySize';

export default function deserializeStreamKeyValue(
  data: Uint8Array,
  algorithm?: SymmetricCipherAlgorithm,
): Uint8Array {
  if (algorithm !== undefined) {
    if (
      algorithm !== SymmetricCipherAlgorithm.Salsa20 &&
      algorithm !== SymmetricCipherAlgorithm.ChaCha20
    ) {
      throw new Error(
        `Unsupported symmetric cipher algorithm "${displaySymmetricCipherAlgorithm(algorithm)}"`,
      );
    }

    const expectedBytes = getSymmetricCipherKeySize(algorithm);
    if (data.byteLength !== expectedBytes) {
      throw new Error(
        `Invalid ${displaySymmetricCipherAlgorithm(algorithm)} key length. Expected ${expectedBytes} bytes, got ${data.byteLength}`,
      );
    }
  }

  return data;
}
