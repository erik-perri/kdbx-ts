const ProtectedStreamAlgorithm = Object.freeze({
  ArcFourVariant: 1,
  Salsa20: 2,
  ChaCha20: 3,
  Invalid: -1,
} as const);

type ProtectedStreamAlgorithm =
  (typeof ProtectedStreamAlgorithm)[keyof typeof ProtectedStreamAlgorithm];

export default ProtectedStreamAlgorithm;
