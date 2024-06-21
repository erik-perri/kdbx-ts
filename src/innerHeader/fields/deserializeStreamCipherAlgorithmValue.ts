import ProtectedStreamAlgorithm from '../../enums/ProtectedStreamAlgorithm';
import SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import isProtectedStreamAlgorithm from '../../utilities/isProtectedStreamAlgorithm';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

export default function deserializeStreamCipherAlgorithmValue(
  data: Uint8Array,
): SymmetricCipherAlgorithm {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid stream cipher algorithm length. Expected 4 bytes, got ${data.byteLength}`,
    );
  }

  const id = Uint8ArrayHelper.toUInt32LE(data);

  if (!isProtectedStreamAlgorithm(id)) {
    throw new Error(`Invalid stream cipher algorithm "${id}"`);
  }

  switch (id) {
    case ProtectedStreamAlgorithm.Salsa20:
      return SymmetricCipherAlgorithm.Salsa20;
    case ProtectedStreamAlgorithm.ChaCha20:
      return SymmetricCipherAlgorithm.ChaCha20;
  }
}
