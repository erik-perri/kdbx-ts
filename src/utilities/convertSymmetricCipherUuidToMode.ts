import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import SymmetricCipherUuid from '../enums/SymmetricCipherUuid';

const uuidToModeMapping: Record<string, SymmetricCipherMode | undefined> = {
  [SymmetricCipherUuid.Aes128]: SymmetricCipherMode.Aes128_CBC,
  [SymmetricCipherUuid.Aes256]: SymmetricCipherMode.Aes256_CBC,
  [SymmetricCipherUuid.Twofish]: SymmetricCipherMode.Twofish_CBC,
  [SymmetricCipherUuid.ChaCha20]: SymmetricCipherMode.ChaCha20,
} as const;

export default function convertSymmetricCipherUuidToMode(
  uuid: string,
): SymmetricCipherMode {
  const mode = uuidToModeMapping[uuid];

  return mode ?? SymmetricCipherMode.InvalidMode;
}
