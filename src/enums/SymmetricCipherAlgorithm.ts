const SymmetricCipherAlgorithm = Object.freeze({
  Aes256_CBC: 'aes256_cbc',
  Twofish_CBC: 'twofish_cbc',
  ChaCha20: 'chacha20',
  Salsa20: 'salsa20',
} as const);

type SymmetricCipherAlgorithm =
  (typeof SymmetricCipherAlgorithm)[keyof typeof SymmetricCipherAlgorithm];

export default SymmetricCipherAlgorithm;
