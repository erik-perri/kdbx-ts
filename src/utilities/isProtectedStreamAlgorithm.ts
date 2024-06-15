import ProtectedStreamAlgorithm from '../enums/ProtectedStreamAlgorithm';

export default function isProtectedStreamAlgorithm(
  type: number,
): type is ProtectedStreamAlgorithm {
  const values: number[] = Object.values(ProtectedStreamAlgorithm);

  return values.includes(type) && type !== ProtectedStreamAlgorithm.Invalid;
}
