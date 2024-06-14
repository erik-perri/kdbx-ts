import type CompressionAlgorithm from '../enums/CompressionAlgorithm';
import type HeaderFieldId from '../enums/HeaderFieldId';

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
  memory: bigint;
  parallelism: bigint;
  salt: Uint8Array;
  uuid: string;
  version: number;
};

export type KdfParameters = AesKdfParameters | Argon2KdfParameters;
