import type { CryptoImplementation } from './crypto/types';
import KeePassVersion from './enums/KeePassVersion';
import parseFileSignature from './header/parseFileSignature';
import { KeePass2 } from './header/versions';
import { type KdbxKey } from './keys/types';
import BufferReader from './utilities/BufferReader';
import readDatabase from './version4/readDatabase';
import { type KdbxDatabase4 } from './version4/types';

export default async function readKdbxFile(
  crypto: CryptoImplementation,
  keys: KdbxKey[],
  fileBytes: Uint8Array,
): Promise<KdbxDatabase4> {
  const reader = new BufferReader(fileBytes);
  const signature = parseFileSignature(reader);

  if (signature.appVersion === KeePassVersion.KeePass1) {
    throw new Error('KeePass1 databases are not supported');
  }

  if (signature.appVersion === KeePassVersion.Unknown) {
    throw new Error('Unknown database format');
  }

  switch (signature.formatVersion & KeePass2.fileVersionCriticalMask) {
    case KeePass2.fileVersion20:
      throw new Error('KeePass2 v2.x databases are not supported');
    case KeePass2.fileVersion30:
      throw new Error('KeePass2 v3.x databases are not supported');
    case KeePass2.fileVersion40:
      break;
    default:
      throw new Error(
        `Unknown database format "0x${signature.formatVersion.toString(16)}"`,
      );
  }

  return readDatabase(crypto, keys, reader, signature);
}
