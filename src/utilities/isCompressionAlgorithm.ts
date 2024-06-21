import CompressionAlgorithm from '../enums/CompressionAlgorithm';

export function isCompressionAlgorithm(
  algorithm: number,
): algorithm is CompressionAlgorithm {
  const values: number[] = Object.values(CompressionAlgorithm);

  return values.includes(algorithm);
}
