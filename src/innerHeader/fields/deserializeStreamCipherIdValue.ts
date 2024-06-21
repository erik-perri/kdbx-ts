import ProtectedStreamAlgorithm from '../../enums/ProtectedStreamAlgorithm';
import SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import isProtectedStreamAlgorithm from '../../utilities/isProtectedStreamAlgorithm';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

export default function deserializeStreamCipherIdValue(
  data: Uint8Array,
): SymmetricCipherMode {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid stream cipher ID length. Expected 4 bytes, got ${data.byteLength}`,
    );
  }

  const id = Uint8ArrayHelper.toUInt32LE(data);

  if (!isProtectedStreamAlgorithm(id)) {
    throw new Error(`Invalid stream cipher ID "${id}"`);
  }

  switch (id) {
    case ProtectedStreamAlgorithm.Salsa20:
      return SymmetricCipherMode.Salsa20;
    case ProtectedStreamAlgorithm.ChaCha20:
      return SymmetricCipherMode.ChaCha20;
  }
}
