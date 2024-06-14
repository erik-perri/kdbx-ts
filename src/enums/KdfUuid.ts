const KdfUuid = Object.freeze({
  AesKdbx3: 'c9d9f39a-628a-4460-bf74-0d08c18a4fea',
  AesKdbx4: '7c02bb82-79a7-4ac0-927d-114a00648238',
  Argon2d: 'ef636ddf-8c29-444b-91f7-a9a403e30a0c',
  Argon2id: '9e298b19-56db-4773-b23d-fc3ec6f0a1e6',
} as const);

type KdfUuid = (typeof KdfUuid)[keyof typeof KdfUuid];

export default KdfUuid;
