const KdfParameterKey = Object.freeze({
  Uuid: '$UUID',
  AesRounds: 'R',
  AesSeed: 'S',
  Argon2Salt: 'S',
  Argon2Parallelism: 'P',
  Argon2Memory: 'M',
  Argon2Iterations: 'I',
  Argon2Version: 'V',
  Argon2Secret: 'K',
  Argon2AssocData: 'A',
} as const);

type KdfParameterKey = (typeof KdfParameterKey)[keyof typeof KdfParameterKey];

export default KdfParameterKey;
