const CompressionAlgorithm = Object.freeze({
  None: 0,
  GZip: 1,
} as const);

type CompressionAlgorithm =
  (typeof CompressionAlgorithm)[keyof typeof CompressionAlgorithm];

export default CompressionAlgorithm;
