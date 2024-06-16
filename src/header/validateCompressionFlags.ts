import type CompressionAlgorithm from '../enums/CompressionAlgorithm';
import { isCompressionAlgorithm } from '../utilities/isCompressionAlgorithm';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';

export default function validateCompressionFlags(
  data: Uint8Array,
): CompressionAlgorithm {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid compression flags length. Expected 4 bytes, got ${data.byteLength}`,
    );
  }

  const id = Uint8ArrayHelper.toUInt32LE(data);

  if (!isCompressionAlgorithm(id)) {
    throw new Error(`Unsupported compression algorithm "${id}"`);
  }

  return id;
}
