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

  if (signature.formatVersion < KeePass2.fileVersion40) {
    throw new Error('KeePass2 databases less than v4.0 are not supported');
  }

  return readDatabase(crypto, keys, reader, signature);
}
