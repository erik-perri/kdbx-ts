import { describe, expect, it } from 'vitest';

import { KeePass2 } from '../constants';
import CompressionAlgorithm from '../enums/CompressionAlgorithm';
import HeaderFieldId from '../enums/HeaderFieldId';
import KdfParameterKey from '../enums/KdfParameterKey';
import KdfUuid from '../enums/KdfUuid';
import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import SymmetricCipherUuid from '../enums/SymmetricCipherUuid';
import VariantMapFieldType from '../enums/VariantMapFieldType';
import { type KdbxOuterHeaderFields } from '../types/format';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import serializeHeaderFields from './serializeHeaderFields';

describe('serializeHeaderFields', () => {
  it('serializes header fields', () => {
    // Arrange
    const header: KdbxOuterHeaderFields = {
      cipherAlgorithm: SymmetricCipherAlgorithm.Aes256_CBC,
      compressionAlgorithm: CompressionAlgorithm.GZip,
      encryptionIV: Uint8ArrayHelper.fromString('IV'.repeat(8)),
      endOfHeader: Uint8ArrayHelper.fromString('\r\n\r\n'),
      kdfParameters: {
        uuid: KdfUuid.AesKdbx4,
        rounds: BigInt(1000),
        seed: Uint8ArrayHelper.fromString('Seed'.repeat(4)),
        variantMapVersion: KeePass2.variantMapVersion,
      },
      masterSeed: Uint8ArrayHelper.fromString('Seed'.repeat(8)),
      publicCustomData: {
        values: {
          Test: {
            type: VariantMapFieldType.Int32,
            value: 1024,
          },
        },
        version: KeePass2.variantMapVersion,
      },
    };

    const expectedResult = Uint8Array.from(
      Buffer.concat([
        // CipherAlgorithm
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.CipherAlgorithm),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromUuid(SymmetricCipherUuid.Aes256),

        // CompressionAlgorithm
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.CompressionAlgorithm),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromUInt32LE(CompressionAlgorithm.GZip),

        // MasterSeed
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.MasterSeed),
        Uint8ArrayHelper.fromUInt32LE(32),
        Uint8ArrayHelper.fromString('Seed'.repeat(8)),

        // EncryptionIV
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.EncryptionIV),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromString('IV'.repeat(8)),

        // KdfParameters
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.KdfParameters),
        Uint8ArrayHelper.fromUInt32LE(77),
        Uint8ArrayHelper.fromUInt16LE(KeePass2.variantMapVersion),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.ByteArray),
        Uint8ArrayHelper.fromUInt32LE(KdfParameterKey.Uuid.length),
        Uint8ArrayHelper.fromString(KdfParameterKey.Uuid),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromUuid(KdfUuid.AesKdbx4),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.UInt64),
        Uint8ArrayHelper.fromUInt32LE(KdfParameterKey.AesRounds.length),
        Uint8ArrayHelper.fromString(KdfParameterKey.AesRounds),
        Uint8ArrayHelper.fromUInt32LE(8),
        Uint8ArrayHelper.fromUInt64LE(1000),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.ByteArray),
        Uint8ArrayHelper.fromUInt32LE(KdfParameterKey.AesSeed.length),
        Uint8ArrayHelper.fromString(KdfParameterKey.AesSeed),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromString('Seed'.repeat(4)),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.End),

        // PublicCustomData
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.PublicCustomData),
        Uint8ArrayHelper.fromUInt32LE(20),
        Uint8ArrayHelper.fromUInt16LE(KeePass2.variantMapVersion),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.Int32),
        Uint8ArrayHelper.fromUInt32LE('Test'.length),
        Uint8ArrayHelper.fromString('Test'),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromInt32LE(1024),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.End),

        // EndOfHeader
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.EndOfHeader),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromString('\r\n\r\n'),
      ]),
    );

    // Act
    const result = serializeHeaderFields(header);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('serializes header fields without custom data or end', () => {
    // Arrange
    const header: KdbxOuterHeaderFields = {
      cipherAlgorithm: SymmetricCipherAlgorithm.Aes256_CBC,
      compressionAlgorithm: CompressionAlgorithm.GZip,
      encryptionIV: Uint8ArrayHelper.fromString('IV'.repeat(8)),
      kdfParameters: {
        uuid: KdfUuid.AesKdbx4,
        rounds: BigInt(1000),
        seed: Uint8ArrayHelper.fromString('Seed'.repeat(4)),
        variantMapVersion: KeePass2.variantMapVersion,
      },
      masterSeed: Uint8ArrayHelper.fromString('Seed'.repeat(8)),
      publicCustomData: undefined,
    };

    const expectedResult = Uint8Array.from(
      Buffer.concat([
        // CipherAlgorithm
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.CipherAlgorithm),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromUuid(SymmetricCipherUuid.Aes256),

        // CompressionAlgorithm
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.CompressionAlgorithm),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromUInt32LE(CompressionAlgorithm.GZip),

        // MasterSeed
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.MasterSeed),
        Uint8ArrayHelper.fromUInt32LE(32),
        Uint8ArrayHelper.fromString('Seed'.repeat(8)),

        // EncryptionIV
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.EncryptionIV),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromString('IV'.repeat(8)),

        // KdfParameters
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.KdfParameters),
        Uint8ArrayHelper.fromUInt32LE(77),
        Uint8ArrayHelper.fromUInt16LE(KeePass2.variantMapVersion),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.ByteArray),
        Uint8ArrayHelper.fromUInt32LE(KdfParameterKey.Uuid.length),
        Uint8ArrayHelper.fromString(KdfParameterKey.Uuid),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromUuid(KdfUuid.AesKdbx4),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.UInt64),
        Uint8ArrayHelper.fromUInt32LE(KdfParameterKey.AesRounds.length),
        Uint8ArrayHelper.fromString(KdfParameterKey.AesRounds),
        Uint8ArrayHelper.fromUInt32LE(8),
        Uint8ArrayHelper.fromUInt64LE(1000),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.ByteArray),
        Uint8ArrayHelper.fromUInt32LE(KdfParameterKey.AesSeed.length),
        Uint8ArrayHelper.fromString(KdfParameterKey.AesSeed),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromString('Seed'.repeat(4)),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.End),

        // EndOfHeader
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.EndOfHeader),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromString('\r\n\r\n'),
      ]),
    );

    // Act
    const result = serializeHeaderFields(header);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
