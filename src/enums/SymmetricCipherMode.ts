const SymmetricCipherMode = Object.freeze({
  Aes128_CBC: 'aes128_cbc',
  Aes256_CBC: 'aes256_cbc',
  Aes128_CTR: 'aes128_ctr',
  Aes256_CTR: 'aes256_ctr',
  Twofish_CBC: 'twofish_cbc',
  ChaCha20: 'chacha20',
  Salsa20: 'salsa20',
  Aes256_GCM: 'aes256_gcm',
  InvalidMode: 'invalid_mode',
} as const);

type SymmetricCipherMode =
  (typeof SymmetricCipherMode)[keyof typeof SymmetricCipherMode];

export default SymmetricCipherMode;
