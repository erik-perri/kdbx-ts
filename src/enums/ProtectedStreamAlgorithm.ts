const ProtectedStreamAlgorithm = Object.freeze({
  Salsa20: 2,
  ChaCha20: 3,
} as const);

type ProtectedStreamAlgorithm =
  (typeof ProtectedStreamAlgorithm)[keyof typeof ProtectedStreamAlgorithm];

export default ProtectedStreamAlgorithm;
