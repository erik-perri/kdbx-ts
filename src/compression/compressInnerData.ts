import pako, { constants } from 'pako';

import CompressionAlgorithm from '../enums/CompressionAlgorithm';

export default function compressInnerData(
  compressionAlgorithm: CompressionAlgorithm,
  data: Uint8Array,
): Uint8Array {
  switch (compressionAlgorithm) {
    case CompressionAlgorithm.None:
      return data;
    case CompressionAlgorithm.GZip:
      return pako.deflate(data, {
        level: 6,
        strategy: constants.Z_DEFAULT_STRATEGY,
        windowBits: 31,
      });
  }
}
