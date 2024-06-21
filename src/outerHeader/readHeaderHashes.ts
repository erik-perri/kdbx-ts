import { type KdbxHeaderHashes } from '../types';
import type BufferReader from '../utilities/BufferReader';

export default function readHeaderHashes(
  buffer: BufferReader,
): KdbxHeaderHashes {
  if (buffer.byteLength < 64) {
    throw new Error(
      `Invalid header hashes length. Expected at least 64 bytes, got ${buffer.byteLength}`,
    );
  }

  const hash = buffer.readBytes(32);
  const hmacHash = buffer.readBytes(32);

  return {
    hash,
    hmacHash,
  };
}
