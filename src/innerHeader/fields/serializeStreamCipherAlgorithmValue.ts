import ProtectedStreamAlgorithm from '../../enums/ProtectedStreamAlgorithm';
import SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import displaySymmetricCipherAlgorithm from '../../utilities/displaySymmetricCipherAlgorithm';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

const streamCipherAlgorithmMap: Partial<
  Record<SymmetricCipherAlgorithm, ProtectedStreamAlgorithm>
> = {
  [SymmetricCipherAlgorithm.ChaCha20]: ProtectedStreamAlgorithm.ChaCha20,
  [SymmetricCipherAlgorithm.Salsa20]: ProtectedStreamAlgorithm.Salsa20,
};

export default function serializeStreamCipherAlgorithmValue(
  algorithm: SymmetricCipherAlgorithm,
): Uint8Array {
  const id = streamCipherAlgorithmMap[algorithm];

  if (!id) {
    throw new Error(
      `Invalid stream cipher algorithm "${displaySymmetricCipherAlgorithm(algorithm)}"`,
    );
  }

  return Uint8ArrayHelper.fromUInt32LE(id);
}
