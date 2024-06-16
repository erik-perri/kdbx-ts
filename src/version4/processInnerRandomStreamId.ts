import ProtectedStreamAlgorithm from '../enums/ProtectedStreamAlgorithm';
import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import isProtectedStreamAlgorithm from '../utilities/isProtectedStreamAlgorithm';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';

export default function processInnerRandomStreamId(
  data: Uint8Array,
): SymmetricCipherMode {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid random stream ID length. Expected 4 bytes, got ${data.byteLength}`,
    );
  }

  const id = Uint8ArrayHelper.toUInt32LE(data);
  const unsupportedAlgorithms: number[] = [
    ProtectedStreamAlgorithm.Invalid,
    ProtectedStreamAlgorithm.ArcFourVariant,
  ];

  if (!isProtectedStreamAlgorithm(id) || unsupportedAlgorithms.includes(id)) {
    throw new Error(`Invalid inner random stream cipher ID "${id}"`);
  }

  switch (id) {
    case ProtectedStreamAlgorithm.Salsa20:
      return SymmetricCipherMode.Salsa20;
    case ProtectedStreamAlgorithm.ChaCha20:
      return SymmetricCipherMode.ChaCha20;
    default:
      throw new Error(`Unsupported inner random stream cipher ID "${id}"`);
  }
}
