import { readFileSync } from 'fs';
import { expect } from 'vitest';

import Argon2Type from '../src/enums/Argon2Type';
import Argon2Version from '../src/enums/Argon2Version';
import CompressionAlgorithm from '../src/enums/CompressionAlgorithm';
import KdfUuid from '../src/enums/KdfUuid';
import SymmetricCipherUuid from '../src/enums/SymmetricCipherUuid';
import type { KdfParameters } from '../src/header/types';
import createFileKey from '../src/keys/createFileKey';
import createPasswordKey from '../src/keys/createPasswordKey';
import { type KdbxKey } from '../src/keys/types';
import nodeCrypto from '../src/nodeCrypto';

type DatabaseInformation = {
  file: Buffer;
  expectedCipher: SymmetricCipherUuid;
  expectedCompressionAlgorithm: CompressionAlgorithm;
  expectedIvLength: number;
  expectedKdfParameters: KdfParameters;
  keyFactory: () => Promise<KdbxKey[]>;
};

export const sampleDatabases: Record<string, DatabaseInformation> = {
  AesAesCompressed: {
    file: readFileSync('fixtures/databases/kdbx4-aes-kdf-aes.kdbx'),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesAesUncompressed: {
    file: readFileSync(
      'fixtures/databases/kdbx4-aes-kdf-aes-uncompressed.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.None,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesAesWithKeyFile: {
    file: readFileSync(
      'fixtures/databases/kdbx4-aes-kdf-aes-with-key-file.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [
      await createPasswordKey(nodeCrypto, 'password'),
      await createFileKey(nodeCrypto, readFileSync('fixtures/sample.key')),
    ],
  },
  AesChaCha20: {
    file: readFileSync('fixtures/databases/kdbx4-aes-kdf-chacha20.kdbx'),
    expectedCipher: SymmetricCipherUuid.ChaCha20,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 12,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesTwofish: {
    file: readFileSync('fixtures/databases/kdbx4-aes-kdf-twofish.kdbx'),
    expectedCipher: SymmetricCipherUuid.Twofish,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  Argon2dAes: {
    file: readFileSync('fixtures/databases/kdbx4-argon2d-kdf-aes.kdbx'),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      iterations: BigInt(2),
      memoryInKibibytes: BigInt(1024),
      parallelism: BigInt(1),
      seed: expect.any(Uint8Array) as Uint8Array,
      type: Argon2Type.Argon2d,
      uuid: KdfUuid.Argon2d,
      version: Argon2Version.V13,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
};

export const sampleDatabaseCases = Object.entries(sampleDatabases).map(
  ([name, information]): [string, DatabaseInformation] => [name, information],
);
