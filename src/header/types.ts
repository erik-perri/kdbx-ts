import type Argon2Type from '../enums/Argon2Type';
import type Argon2Version from '../enums/Argon2Version';
import type CompressionAlgorithm from '../enums/CompressionAlgorithm';
import type HeaderFieldId from '../enums/HeaderFieldId';
import type KdfUuid from '../enums/KdfUuid';
import type KeePassVersion from '../enums/KeePassVersion';
import type SymmetricCipherMode from '../enums/SymmetricCipherMode';

export type KdbxSignature = {
  appVersion: KeePassVersion;
  formatVersion: number;
  signature1: number;
  signature2: number;
};

export type KdbxHeaderField = {
  data: Uint8Array;
  id: HeaderFieldId;
};

export type KdbxHeader = {
  cipherId: string;
  cipherMode: SymmetricCipherMode;
  compressionAlgorithm: CompressionAlgorithm;
  encryptionIV: Uint8Array;
  kdfParameters: KdfParameters;
  masterSeed: Uint8Array;
  publicCustomData?: unknown;
};

export type AesKdfParameters = {
  rounds: bigint;
  seed: Uint8Array;
  uuid: typeof KdfUuid.AesKdbx3 | typeof KdfUuid.AesKdbx4;
};

export type Argon2KdfParameters = {
  iterations: bigint;
  memoryInKibibytes: bigint;
  parallelism: bigint;
  seed: Uint8Array;
  type: Argon2Type;
  uuid: typeof KdfUuid.Argon2d | typeof KdfUuid.Argon2id;
  version: Argon2Version;
};

export type KdfParameters = AesKdfParameters | Argon2KdfParameters;
