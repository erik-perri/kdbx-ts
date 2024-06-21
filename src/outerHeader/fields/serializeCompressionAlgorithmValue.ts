import type CompressionAlgorithm from '../../enums/CompressionAlgorithm';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

export default function serializeCompressionAlgorithmValue(
  algorithm: CompressionAlgorithm,
): Uint8Array {
  return Uint8ArrayHelper.fromUInt32LE(algorithm);
}
