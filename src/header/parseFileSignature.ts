import type Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import type { KdbxSignature } from './types';
import { findVersionFromSignature } from './versions';

export default function parseFileSignature(
  reader: Uint8ArrayCursorReader,
): KdbxSignature {
  const signature1 = reader.readUInt32LE();
  const signature2 = reader.readUInt32LE();
  const formatVersion = reader.readUInt32LE();
  const appVersion = findVersionFromSignature(signature1, signature2);

  return {
    signature1,
    signature2,
    formatVersion,
    appVersion,
  };
}
