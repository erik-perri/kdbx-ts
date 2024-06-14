const SymmetricCipherDirection = Object.freeze({
  Decrypt: 0,
  Encrypt: 1,
} as const);

type SymmetricCipherDirection =
  (typeof SymmetricCipherDirection)[keyof typeof SymmetricCipherDirection];

export default SymmetricCipherDirection;
