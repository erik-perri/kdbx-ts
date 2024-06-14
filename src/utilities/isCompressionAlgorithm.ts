import CompressionAlgorithm from '../enums/CompressionAlgorithm';

export function isCompressionAlgorithm(
  mode: number,
): mode is CompressionAlgorithm {
  const values: number[] = Object.values(CompressionAlgorithm);

  return values.includes(mode);
}
