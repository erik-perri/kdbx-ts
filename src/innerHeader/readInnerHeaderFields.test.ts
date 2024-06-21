import { describe, expect, it } from 'vitest';

import HeaderFieldId from '../enums/HeaderFieldId';
import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import ProtectedStreamAlgorithm from '../enums/ProtectedStreamAlgorithm';
import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import { type KdbxInnerHeader } from '../types';
import BufferReader from '../utilities/BufferReader';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import readInnerHeaderFields from './readInnerHeaderFields';

describe('readInnerHeaderFields', () => {
  it('reads inner header fields until the end of header', () => {
    // Arrange
    const data = Uint8Array.from(
      Buffer.concat([
        // InnerEncryptionAlgorithm
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.InnerEncryptionAlgorithm),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromUInt32LE(ProtectedStreamAlgorithm.Salsa20),

        // InnerEncryptionKey
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.InnerEncryptionKey),
        Uint8ArrayHelper.fromUInt32LE(32),
        Uint8ArrayHelper.fromString('Test'.repeat(8)),

        // Binary
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.Binary),
        Uint8ArrayHelper.fromUInt32LE(7),
        Uint8ArrayHelper.fromUInt8(0x01),
        Uint8ArrayHelper.fromString('Test 1'),

        // Binary
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.Binary),
        Uint8ArrayHelper.fromUInt32LE(7),
        Uint8ArrayHelper.fromUInt8(0x00),
        Uint8ArrayHelper.fromString('Test 2'),

        // Binary
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.Binary),
        Uint8ArrayHelper.fromUInt32LE(1),
        Uint8ArrayHelper.fromUInt8(0x00),

        // EndOfHeader
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.EndOfHeader),
        Uint8ArrayHelper.fromUInt32LE(0),
      ]),
    );

    const reader = new BufferReader(data);

    // Act
    const result = readInnerHeaderFields(reader);

    // Assert
    expect(result).toEqual({
      binaryPool: [
        {
          data: Uint8ArrayHelper.fromString('Test 1'),
          index: '0',
          protectInMemory: true,
        },
        {
          data: Uint8ArrayHelper.fromString('Test 2'),
          index: '1',
          protectInMemory: false,
        },
        {
          data: Uint8Array.from([]),
          index: '2',
          protectInMemory: false,
        },
      ],
      endOfHeader: Uint8Array.from([]),
      innerEncryptionAlgorithm: SymmetricCipherAlgorithm.Salsa20,
      innerEncryptionKey: Uint8Array.from(
        Uint8ArrayHelper.fromString('Test'.repeat(8)),
      ),
    } satisfies KdbxInnerHeader);
  });

  it('validates stream key length when algorithm is provided second', () => {
    // Arrange
    const data = Uint8Array.from(
      Buffer.concat([
        // InnerEncryptionKey
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.InnerEncryptionKey),
        Uint8ArrayHelper.fromUInt32LE(28),
        Uint8ArrayHelper.fromString('Test'.repeat(7)),

        // InnerEncryptionAlgorithm
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.InnerEncryptionAlgorithm),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromUInt32LE(ProtectedStreamAlgorithm.Salsa20),

        // EndOfHeader
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.EndOfHeader),
        Uint8ArrayHelper.fromUInt32LE(0),
      ]),
    );

    const reader = new BufferReader(data);

    // Act
    expect(() => readInnerHeaderFields(reader)).toThrowError(
      'Invalid Salsa20 key length. Expected 32 bytes, got 4',
    );

    // Assert
    // Nothing to assert.
  });

  it.each([
    [
      'InnerEncryptionAlgorithm',
      {
        field: InnerHeaderFieldId.InnerEncryptionAlgorithm,
        error:
          'Unexpected empty inner header field length for "InnerEncryptionAlgorithm"',
      },
    ],
    [
      'InnerEncryptionKey',
      {
        field: InnerHeaderFieldId.InnerEncryptionKey,
        error:
          'Unexpected empty inner header field length for "InnerEncryptionKey"',
      },
    ],
    [
      'InnerRandomStreamID',
      {
        field: InnerHeaderFieldId.Binary,
        error: 'Unexpected empty inner header field length for "Binary"',
      },
    ],
  ])(
    `throws an error if passed unsupported field %s`,
    (_, { field, error }) => {
      // Arrange
      const data = Uint8Array.from(
        Buffer.concat([
          Uint8ArrayHelper.fromUInt8(field),
          Uint8ArrayHelper.fromInt32LE(0),
        ]),
      );

      const reader = new BufferReader(data);

      // Act
      expect(() => readInnerHeaderFields(reader)).toThrowError(error);

      // Assert
      // Nothing to assert.
    },
  );

  it('throws an error when unknown inner header field is found', () => {
    // Arrange
    const data = Uint8Array.from(
      Buffer.concat([
        Uint8ArrayHelper.fromUInt8(100),
        Uint8ArrayHelper.fromUInt8(0),
      ]),
    );

    const reader = new BufferReader(data);

    // Act
    expect(() => readInnerHeaderFields(reader)).toThrowError(
      'Unknown inner header field ID encountered "100"',
    );

    // Assert
    // Nothing to assert.
  });

  it('throws an error when inner header is incomplete', () => {
    // Arrange
    const data = Uint8Array.from(
      Buffer.concat([
        Uint8ArrayHelper.fromUInt8(HeaderFieldId.EndOfHeader),
        Uint8ArrayHelper.fromUInt32LE(0),
      ]),
    );

    const reader = new BufferReader(data);

    // Act
    expect(() => readInnerHeaderFields(reader)).toThrowError(
      'Missing required inner header fields: "InnerEncryptionAlgorithm" and "InnerEncryptionKey"',
    );

    // Assert
    // Nothing to assert.
  });
});
