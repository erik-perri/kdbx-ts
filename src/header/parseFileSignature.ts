import determineKeePassVersion from '../utilities/determineKeePassVersion';
import type Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import type { KdbxSignature } from './types';

export default function parseFileSignature(
  reader: Uint8ArrayCursorReader,
): KdbxSignature {
  const signature1 = reader.readUInt32LE();
  const signature2 = reader.readUInt32LE();
  const formatVersion = reader.readUInt32LE();
  const appVersion = determineKeePassVersion(signature1, signature2);

  return {
    signature1,
    signature2,
    formatVersion,
    appVersion,
  };
}
