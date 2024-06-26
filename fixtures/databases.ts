import { readFileSync } from 'fs';
import { expect } from 'vitest';

import { KeePass2 } from '../src/constants';
import Argon2Type from '../src/enums/Argon2Type';
import Argon2Version from '../src/enums/Argon2Version';
import CompressionAlgorithm from '../src/enums/CompressionAlgorithm';
import KdfUuid from '../src/enums/KdfUuid';
import SymmetricCipherUuid from '../src/enums/SymmetricCipherUuid';
import createChallengeResponseKey from '../src/keys/createChallengeResponseKey';
import createFileKey from '../src/keys/createFileKey';
import createPasswordKey from '../src/keys/createPasswordKey';
import { type KdbxKdfParameters } from '../src/types/format';
import { type KdbxKey } from '../src/types/keys';
import Uint8ArrayHelper from '../src/utilities/Uint8ArrayHelper';
import nodeCrypto from './crypto/nodeCrypto';

const mockChallengeResponseKey = createChallengeResponseKey(
  (challenge: Uint8Array) => {
    const mockResponses = [
      // YubiKey Challenge-Response with secret key 0de28ecd0d35e91f6bea76d3c09f020ce79af783
      {
        data: Uint8Array.from([
          0x98, 0x48, 0xeb, 0x4c, 0x3c, 0x04, 0x43, 0x61, 0xfa, 0x02, 0x89,
          0x2b, 0x66, 0xbd, 0xf5, 0xfd, 0x72, 0x1e, 0x12, 0xe7, 0x3b, 0x37,
          0xde, 0x8b, 0x53, 0x3a, 0x32, 0x2f, 0x14, 0xab, 0xec, 0x89,
        ]),
        response: Uint8Array.from([
          0x3b, 0x16, 0x7c, 0x56, 0xf9, 0x2a, 0xc5, 0x01, 0xcd, 0xdd, 0xa3,
          0xf1, 0x09, 0x0e, 0xdb, 0x36, 0xe7, 0x1e, 0x7d, 0x42,
        ]),
      },
    ];

    for (const { data, response } of mockResponses) {
      if (Uint8ArrayHelper.areEqual(data, challenge)) {
        return Promise.resolve(response);
      }
    }

    throw new Error('Unknown challenge response');
  },
);

type DatabaseInformation = {
  file: Buffer;
  expectedCipher: SymmetricCipherUuid;
  expectedCompressionAlgorithm: CompressionAlgorithm;
  expectedIvLength: number;
  expectedKdfParameters: KdbxKdfParameters;
  keyFactory: () => Promise<KdbxKey[]>;
};

export const sampleDatabasesKeePass2: Record<string, DatabaseInformation> = {
  AesAesCompressed: {
    file: readFileSync('fixtures/databases/keepass2-kdbx4-aes-kdf-aes.kdbx'),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
      uuid: KdfUuid.AesKdbx4,
      variantMapVersion: KeePass2.variantMapVersion,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesAesUncompressed: {
    file: readFileSync(
      'fixtures/databases/keepass2-kdbx4-aes-kdf-aes-uncompressed.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.None,
    expectedIvLength: 16,
    expectedKdfParameters: {
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
      uuid: KdfUuid.AesKdbx4,
      variantMapVersion: KeePass2.variantMapVersion,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
};

export const sampleDatabasesKeePassXC: Record<string, DatabaseInformation> = {
  AesAesCompressed: {
    file: readFileSync('fixtures/databases/keepassxc-kdbx4-aes-kdf-aes.kdbx'),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
      uuid: KdfUuid.AesKdbx4,
      variantMapVersion: KeePass2.variantMapVersion,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesAesUncompressed: {
    file: readFileSync(
      'fixtures/databases/keepassxc-kdbx4-aes-kdf-aes-uncompressed.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.None,
    expectedIvLength: 16,
    expectedKdfParameters: {
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
      uuid: KdfUuid.AesKdbx4,
      variantMapVersion: KeePass2.variantMapVersion,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesAesWithKeyFile: {
    file: readFileSync(
      'fixtures/databases/keepassxc-kdbx4-aes-kdf-aes-with-key-file.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
      uuid: KdfUuid.AesKdbx4,
      variantMapVersion: KeePass2.variantMapVersion,
    },
    keyFactory: async () => [
      await createPasswordKey(nodeCrypto, 'password'),
      await createFileKey(nodeCrypto, readFileSync('fixtures/sample.key')),
    ],
  },
  AesAesWithHardwareKey: {
    file: readFileSync(
      'fixtures/databases/keepassxc-kdbx4-aes-kdf-aes-with-hardware-key.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
      uuid: KdfUuid.AesKdbx4,
      variantMapVersion: KeePass2.variantMapVersion,
    },
    keyFactory: async () => [
      await createPasswordKey(nodeCrypto, 'password'),
      mockChallengeResponseKey,
    ],
  },
  AesChaCha20: {
    file: readFileSync(
      'fixtures/databases/keepassxc-kdbx4-aes-kdf-chacha20.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.ChaCha20,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 12,
    expectedKdfParameters: {
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
      uuid: KdfUuid.AesKdbx4,
      variantMapVersion: KeePass2.variantMapVersion,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesTwofish: {
    file: readFileSync(
      'fixtures/databases/keepassxc-kdbx4-aes-kdf-twofish.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Twofish,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
      uuid: KdfUuid.AesKdbx4,
      variantMapVersion: KeePass2.variantMapVersion,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  Argon2dAes: {
    file: readFileSync(
      'fixtures/databases/keepassxc-kdbx4-argon2d-kdf-aes.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      iterations: BigInt(2),
      memoryInBytes: BigInt(1024),
      parallelism: BigInt(1),
      seed: expect.any(Uint8Array) as Uint8Array,
      type: Argon2Type.Argon2d,
      uuid: KdfUuid.Argon2d,
      variantMapVersion: KeePass2.variantMapVersion,
      version: Argon2Version.V13,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
};

export const sampleDatabaseCases = [
  ...Object.entries(sampleDatabasesKeePassXC).map(
    ([name, information]): [string, DatabaseInformation] => [
      `${name} generated with KeePassXC`,
      information,
    ],
  ),
  ...Object.entries(sampleDatabasesKeePass2).map(
    ([name, information]): [string, DatabaseInformation] => [
      `${name} generated with KeePass2`,
      information,
    ],
  ),
];
