const SymmetricCipherMode = Object.freeze({
  Aes128_CBC: 'aes128_cbc',
  Aes256_CBC: 'aes256_cbc',
  Twofish_CBC: 'twofish_cbc',
  ChaCha20: 'chacha20',
  Salsa20: 'salsa20',
} as const);

type SymmetricCipherMode =
  (typeof SymmetricCipherMode)[keyof typeof SymmetricCipherMode];

export default SymmetricCipherMode;
