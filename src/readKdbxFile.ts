import type { CryptoImplementation } from './crypto/types';
import KdbxVersion from './enums/KdbxVersion';
import KeePassVersion from './enums/KeePassVersion';
import parseFileSignature from './header/parseFileSignature';
import { type KdbxKey } from './keys/types';
import Uint8ArrayCursorReader from './utilities/Uint8ArrayCursorReader';
import parseDatabase, { type KdbxDatabase4 } from './version4/parseDatabase';

export default async function readKdbxFile(
  crypto: CryptoImplementation,
  keys: KdbxKey[],
  fileBytes: Uint8Array,
): Promise<KdbxDatabase4> {
  const reader = new Uint8ArrayCursorReader(fileBytes);
  const signature = parseFileSignature(reader);

  if (signature.appVersion === KeePassVersion.KeePass1) {
    throw new Error('KeePass 1 databases are not supported');
  }

  if (signature.appVersion === KeePassVersion.Unknown) {
    throw new Error('Unknown database format');
  }

  if (signature.formatVersion < KdbxVersion.Version40) {
    throw new Error('KeePass databases less than v4.0 are not supported');
  }

  return parseDatabase(crypto, keys, reader, signature);
}
