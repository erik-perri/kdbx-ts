import KeePassVersion from './enums/KeePassVersion';
import UnknownKdbxSignatureError from './errors/UnknownKdbxSignatureError';
import UnsupportedKdbxVersionError from './errors/UnsupportedKdbxVersionError';
import readHeaderFields from './outerHeader/readHeaderFields';
import readSignature from './outerHeader/readSignature';
import { type KdbxOuterHeader } from './types/format';
import BufferReader from './utilities/BufferReader';
import getVersionFromSignature from './utilities/getVersionFromSignature';

export default function parseKdbxHeader(
  fileBytes: Buffer | Uint8Array | number[],
): KdbxOuterHeader & { size: number } {
  const reader = new BufferReader(fileBytes);

  const signature = readSignature(reader);
  const appVersion = getVersionFromSignature(signature);

  switch (appVersion) {
    case KeePassVersion.KeePass1:
      throw new UnsupportedKdbxVersionError(
        'KeePass1 databases are not supported',
      );
    case KeePassVersion.KeePass2:
      break;
    default:
      throw new UnknownKdbxSignatureError('Unknown database format');
  }

  switch (signature.versionMajor) {
    case 2:
      throw new UnsupportedKdbxVersionError(
        'KeePass2 v2.x databases are not supported',
      );
    case 3:
      throw new UnsupportedKdbxVersionError(
        'KeePass2 v3.x databases are not supported',
      );
    case 4:
      break;
    default:
      throw new UnsupportedKdbxVersionError(
        `Unknown database version "${signature.versionMajor}.${signature.versionMinor}"`,
      );
  }

  const fields = readHeaderFields(reader);

  return {
    fields,
    signature,
    size: reader.offset,
  };
}
