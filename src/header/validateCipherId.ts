import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import SymmetricCipherUuid from '../enums/SymmetricCipherUuid';
import displayUuid from '../utilities/displayUuid';

const uuidToModeMapping: Record<string, SymmetricCipherMode | undefined> = {
  [SymmetricCipherUuid.Aes128]: SymmetricCipherMode.Aes128_CBC,
  [SymmetricCipherUuid.Aes256]: SymmetricCipherMode.Aes256_CBC,
  [SymmetricCipherUuid.Twofish]: SymmetricCipherMode.Twofish_CBC,
  [SymmetricCipherUuid.ChaCha20]: SymmetricCipherMode.ChaCha20,
} as const;

export default function validateCipherId(
  data: Uint8Array,
): [string, SymmetricCipherMode] {
  if (data.byteLength !== 16) {
    throw new Error(
      `Invalid cipher ID length. Expected 16 bytes, got ${data.byteLength}`,
    );
  }

  const uuid = displayUuid(data);
  const mode = uuidToModeMapping[uuid];

  if (!mode) {
    throw new Error(`Unsupported cipher "${uuid}"`);
  }

  return [uuid, mode];
}
