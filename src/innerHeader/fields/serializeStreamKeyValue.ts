import type SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import displaySymmetricCipherMode from '../../utilities/displaySymmetricCipherMode';
import getSymmetricCipherKeySize from '../../utilities/getSymmetricCipherKeySize';

export default function serializeStreamKeyValue(
  data: Uint8Array,
  mode: SymmetricCipherMode,
): Uint8Array {
  const expectedLength = getSymmetricCipherKeySize(mode);

  if (data.byteLength !== expectedLength) {
    throw new Error(
      `Invalid ${displaySymmetricCipherMode(mode)} key length. Expected ${expectedLength} bytes, got ${data.byteLength}`,
    );
  }

  return data;
}
