import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import convertSymmetricCipherUuidToMode from '../utilities/convertSymmetricCipherUuidToMode';
import displayUuid from '../utilities/displayUuid';

export default function processCipherId(data: Uint8Array): string {
  if (data.byteLength !== 16) {
    throw new Error(
      `Invalid cipher ID length. Expected 16 bytes, got ${data.byteLength}`,
    );
  }

  const uuid = displayUuid(data);

  if (
    convertSymmetricCipherUuidToMode(uuid) === SymmetricCipherMode.InvalidMode
  ) {
    throw new Error(`Unsupported cipher "${uuid}"`);
  }

  return uuid;
}
