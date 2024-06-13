import determineKeePassVersion from './kdbx/determineKeePassVersion';
import KdbxVersion from './kdbx/enums/KdbxVersion';
import KeePassVersion from './kdbx/enums/KeePassVersion';
import type KdbxKey from './keys/KdbxKey';
import Uint8ArrayCursorReader from './utilities/Uint8ArrayCursorReader';

export default async function parseKdbxFile(
  _key: KdbxKey,
  fileBytes: Uint8Array,
): Promise<unknown> {
  const reader = new Uint8ArrayCursorReader(fileBytes);

  const signatureOne = reader.readUInt32LE();
  const signatureTwo = reader.readUInt32LE();
  const version = reader.readUInt32LE();

  const appVersion = determineKeePassVersion(signatureOne, signatureTwo);

  if (appVersion === KeePassVersion.KeePass1) {
    throw new Error('KeePass 1 databases are not supported');
  }

  if (appVersion === KeePassVersion.Unknown) {
    throw new Error('Unknown database format');
  }

  if (version < KdbxVersion.Version40) {
    throw new Error('KeePass databases less than v4.0 are not supported');
  }

  return Promise.resolve();
}
