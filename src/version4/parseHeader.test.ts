import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

import CompressionAlgorithm from '../enums/CompressionAlgorithm';
import KdfUuid from '../enums/KdfUuid';
import SymmetricCipherUuid from '../enums/SymmetricCipherUuid';
import Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import parseHeader from './parseHeader';

describe('parseHeader', () => {
  it.each([
    [
      'aes-aes',
      {
        file: readFileSync('fixtures/databases/kdbx4-aes-kdf-aes.kdbx'),
        expectedCipher: SymmetricCipherUuid.Aes256,
        expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
        expectedIvLength: 16,
        expectedKdfParameters: {
          uuid: KdfUuid.AesKdbx4,
          rounds: BigInt(100),
          seed: expect.any(Uint8Array) as Uint8Array,
        },
      },
    ],
    [
      'aes-aes uncompressed',
      {
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
      },
    ],
    [
      'aes-chacha20',
      {
        file: readFileSync('fixtures/databases/kdbx4-aes-kdf-chacha20.kdbx'),
        expectedCipher: SymmetricCipherUuid.ChaCha20,
        expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
        expectedIvLength: 12,
        expectedKdfParameters: {
          uuid: KdfUuid.AesKdbx4,
          rounds: BigInt(100),
          seed: expect.any(Uint8Array) as Uint8Array,
        },
      },
    ],
    [
      'aes-twofish',
      {
        file: readFileSync('fixtures/databases/kdbx4-aes-kdf-twofish.kdbx'),
        expectedCipher: SymmetricCipherUuid.Twofish,
        expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
        expectedIvLength: 16,
        expectedKdfParameters: {
          uuid: KdfUuid.AesKdbx4,
          rounds: BigInt(100),
          seed: expect.any(Uint8Array) as Uint8Array,
        },
      },
    ],
    [
      'argon2d-aes',
      {
        file: readFileSync('fixtures/databases/kdbx4-argon2d-kdf-aes.kdbx'),
        expectedCipher: SymmetricCipherUuid.Aes256,
        expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
        expectedIvLength: 16,
        expectedKdfParameters: {
          iterations: BigInt(100),
          memory: BigInt(8 * 1024 * 1024),
          parallelism: BigInt(2),
          salt: expect.any(Uint8Array) as Uint8Array,
          uuid: KdfUuid.Argon2d,
          version: 0x13,
        },
      },
    ],
  ])(
    `parses kdbx header %s`,
    (
      _,
      {
        expectedCipher,
        expectedCompressionAlgorithm,
        expectedIvLength,
        expectedKdfParameters,
        file,
      },
    ) => {
      // Arrange
      const reader = new Uint8ArrayCursorReader(file);

      // Skip the signature and version fields.
      reader.offset = 0xc;

      // Act
      const header = parseHeader(reader);

      // Assert
      expect(header.cipherId).toEqual(expectedCipher);
      expect(header.compressionAlgorithm).toEqual(expectedCompressionAlgorithm);
      expect(header.masterSeed).toHaveLength(32);
      expect(header.encryptionIV).toHaveLength(expectedIvLength);
      expect(header.kdfParameters).toEqual(expectedKdfParameters);
    },
  );
});
