import ProtectedStreamAlgorithm from '../../enums/ProtectedStreamAlgorithm';
import SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import displaySymmetricCipherMode from '../../utilities/displaySymmetricCipherMode';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

const streamCipherIdMap: Partial<
  Record<SymmetricCipherMode, ProtectedStreamAlgorithm>
> = {
  [SymmetricCipherMode.ChaCha20]: ProtectedStreamAlgorithm.ChaCha20,
  [SymmetricCipherMode.Salsa20]: ProtectedStreamAlgorithm.Salsa20,
};

export default function serializeStreamCipherIdValue(
  mode: SymmetricCipherMode,
): Uint8Array {
  const id = streamCipherIdMap[mode];

  if (!id) {
    throw new Error(
      `Invalid stream cipher mode "${displaySymmetricCipherMode(mode)}"`,
    );
  }

  return Uint8ArrayHelper.fromUInt32LE(id);
}
