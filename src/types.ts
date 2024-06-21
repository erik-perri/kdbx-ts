import type Argon2Type from './enums/Argon2Type';
import type Argon2Version from './enums/Argon2Version';
import type CompressionAlgorithm from './enums/CompressionAlgorithm';
import type KdfUuid from './enums/KdfUuid';
import type SymmetricCipherAlgorithm from './enums/SymmetricCipherAlgorithm';
import type VariantMapFieldType from './enums/VariantMapFieldType';
import type Database from './structure/Database';

export type KdbxFile = {
  database: Database;
  header: KdbxOuterHeader;
  innerHeader: KdbxInnerHeader;
  signature: KdbxSignature;
};

export type KdbxSignature = {
  signature1: number;
  signature2: number;
  versionMajor: number;
  versionMinor: number;
};

export type KdbxOuterHeader = {
  cipherAlgorithm: SymmetricCipherAlgorithm;
  compressionAlgorithm: CompressionAlgorithm;
  encryptionIV: Uint8Array;
  endOfHeader: Uint8Array;
  kdfParameters: KdbxKdfParameters;
  masterSeed: Uint8Array;
  publicCustomData?: KdbxVariantMap;
};

export type KdbxHeaderHashes = {
  /**
   * SHA-256 hash of the header data for integrity verification
   */
  hash: Uint8Array;

  /**
   * HMAC-SHA-256 hash of the header data for authenticity verification
   */
  hmacHash: Uint8Array;
};

export type KdbxVariantMapValue =
  | {
      type: typeof VariantMapFieldType.End;
      value: never;
    }
  | {
      type: typeof VariantMapFieldType.Bool;
      value: boolean;
    }
  | {
      type: typeof VariantMapFieldType.Int32;
      value: number;
    }
  | {
      type: typeof VariantMapFieldType.UInt32;
      value: number;
    }
  | {
      type: typeof VariantMapFieldType.Int64;
      value: bigint;
    }
  | {
      type: typeof VariantMapFieldType.UInt64;
      value: bigint;
    }
  | {
      type: typeof VariantMapFieldType.String;
      value: string;
    }
  | {
      type: typeof VariantMapFieldType.ByteArray;
      value: Uint8Array;
    };

export type KdbxVariantMapValues = {
  [key: string]: KdbxVariantMapValue | undefined;
};

export type KdbxVariantMap = {
  values: KdbxVariantMapValues;
  version: number;
};

export type KdbxAesKdfParameters = {
  rounds: bigint;
  seed: Uint8Array;
  uuid: typeof KdfUuid.AesKdbx3 | typeof KdfUuid.AesKdbx4;
  variantMapVersion: number;
};

export type KdbxArgon2KdfParameters = {
  iterations: bigint;
  memoryInBytes: bigint;
  parallelism: bigint;
  seed: Uint8Array;
  type: Argon2Type;
  uuid: typeof KdfUuid.Argon2d | typeof KdfUuid.Argon2id;
  variantMapVersion: number;
  version: Argon2Version;
};

export type KdbxKdfParameters = KdbxAesKdfParameters | KdbxArgon2KdfParameters;

export type KdbxBinaryPoolValue = {
  data: Uint8Array;
  index: string;
  protectInMemory: boolean;
};

export type KdbxInnerHeader = {
  binaryPool?: KdbxBinaryPoolValue[];
  endOfHeader: Uint8Array;
  innerEncryptionAlgorithm: SymmetricCipherAlgorithm;
  innerEncryptionKey: Uint8Array;
};
