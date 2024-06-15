import type CompressionAlgorithm from '../enums/CompressionAlgorithm';
import { isCompressionAlgorithm } from '../utilities/isCompressionAlgorithm';
import Uint8ArrayReader from '../utilities/Uint8ArrayReader';

export default function validateCompressionFlags(
  data: Uint8Array,
): CompressionAlgorithm {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid compression flags length. Expected 4 bytes, got ${data.byteLength}`,
    );
  }

  const id = Uint8ArrayReader.toUInt32LE(data);

  if (!isCompressionAlgorithm(id)) {
    throw new Error(`Unsupported compression algorithm "${id}"`);
  }

  return id;
}
