import type SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import displaySymmetricCipherAlgorithm from '../../utilities/displaySymmetricCipherAlgorithm';
import getSymmetricCipherKeySize from '../../utilities/getSymmetricCipherKeySize';

export default function serializeStreamKeyValue(
  data: Uint8Array,
  algorithm: SymmetricCipherAlgorithm,
): Uint8Array {
  const expectedLength = getSymmetricCipherKeySize(algorithm);
  if (data.byteLength !== expectedLength) {
    throw new Error(
      `Invalid ${displaySymmetricCipherAlgorithm(algorithm)} key length. Expected ${expectedLength} bytes, got ${data.byteLength}`,
    );
  }

  return data;
}
