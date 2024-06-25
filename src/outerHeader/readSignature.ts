import { type KdbxSignature } from '../types/format';
import type BufferReader from '../utilities/BufferReader';

export default function readSignature(buffer: BufferReader): KdbxSignature {
  if (buffer.byteLength < 12) {
    throw new Error(
      `Unable to parse signature. Expected at least 12 bytes, got ${buffer.byteLength}`,
    );
  }

  const signature1 = buffer.readUInt32LE();
  const signature2 = buffer.readUInt32LE();
  const versionMinor = buffer.readUInt16LE();
  const versionMajor = buffer.readUInt16LE();

  return {
    signature1,
    signature2,
    versionMinor,
    versionMajor,
  };
}
