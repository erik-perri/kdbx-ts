const HashAlgorithm = Object.freeze({
  Sha256: 'sha256',
  Sha512: 'sha512',
} as const);

type HashAlgorithm = (typeof HashAlgorithm)[keyof typeof HashAlgorithm];

export default HashAlgorithm;
