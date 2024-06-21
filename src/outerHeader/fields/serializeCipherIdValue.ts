import SymmetricCipherMode from '../../enums/SymmetricCipherMode';
import SymmetricCipherUuid from '../../enums/SymmetricCipherUuid';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

const modeToUuidMapping: Partial<Record<SymmetricCipherMode, string>> = {
  [SymmetricCipherMode.Aes128_CBC]: SymmetricCipherUuid.Aes128,
  [SymmetricCipherMode.Aes256_CBC]: SymmetricCipherUuid.Aes256,
  [SymmetricCipherMode.Twofish_CBC]: SymmetricCipherUuid.Twofish,
  [SymmetricCipherMode.ChaCha20]: SymmetricCipherUuid.ChaCha20,
} as const;

export default function serializeCipherIdValue(
  mode: SymmetricCipherMode,
): Uint8Array {
  const uuid = modeToUuidMapping[mode];

  if (uuid === undefined) {
    throw new Error(`Unsupported cipher mode "${mode}"`);
  }

  return Uint8ArrayHelper.fromUuid(uuid);
}
