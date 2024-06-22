const SymmetricCipherUuid = Object.freeze({
  Aes256: '31c1f2e6-bf71-4350-be58-05216afc5aff',
  Twofish: 'ad68f29f-576f-4bb9-a36a-d47af965346c',
  ChaCha20: 'd6038a2b-8b6f-4cb5-a524-339a31dbb59a',
} as const);

type SymmetricCipherUuid =
  (typeof SymmetricCipherUuid)[keyof typeof SymmetricCipherUuid];

export default SymmetricCipherUuid;
