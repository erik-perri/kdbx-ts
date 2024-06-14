import type Argon2Type from '../enums/Argon2Type';
import type Argon2Version from '../enums/Argon2Version';
import type CompressionAlgorithm from '../enums/CompressionAlgorithm';
import type HeaderFieldId from '../enums/HeaderFieldId';
import type KdfUuid from '../enums/KdfUuid';

export type KdbxHeaderField = {
  data: Uint8Array;
  id: HeaderFieldId;
};

export type KdbxHeader = {
  cipher: string;
  compressionAlgorithm: CompressionAlgorithm;
  encryptionIV: Uint8Array;
  kdfParameters: KdfParameters;
  masterSeed: Uint8Array;
  publicCustomData?: unknown;
};

type AesKdfParameters = {
  rounds: bigint;
  seed: Uint8Array;
  uuid: string;
};

type Argon2KdfParameters = {
  iterations: bigint;
  memoryInKibibytes: bigint;
  parallelism: bigint;
  seed: Uint8Array;
  type: Argon2Type;
  uuid: typeof KdfUuid.Argon2d | typeof KdfUuid.Argon2id;
  version: Argon2Version;
};

export type KdfParameters = AesKdfParameters | Argon2KdfParameters;
