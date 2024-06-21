import { type KdbxSignature } from '../types';
import BufferWriter from '../utilities/BufferWriter';

export default function serializeSignature(
  signature: KdbxSignature,
): Uint8Array {
  const data = new BufferWriter();

  data.writeUInt32LE(signature.signature1);
  data.writeUInt32LE(signature.signature2);
  data.writeUInt16LE(signature.versionMinor);
  data.writeUInt16LE(signature.versionMajor);

  return data.toUint8Array();
}
