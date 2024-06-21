import { describe, expect, it } from 'vitest';

import HeaderFieldId from '../enums/HeaderFieldId';
import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import ProtectedStreamAlgorithm from '../enums/ProtectedStreamAlgorithm';
import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import { type KdbxInnerHeader } from '../types';
import BufferReader from '../utilities/BufferReader';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import readInnerHeaderFields from './readInnerHeaderFields';

describe('readInnerHeaderFields', () => {
  it('reads inner header fields until the end of header', () => {
    // Arrange
    const data = Uint8Array.from(
      Buffer.concat([
        // InnerStreamMode
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.InnerStreamMode),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromUInt32LE(ProtectedStreamAlgorithm.Salsa20),

        // InnerStreamKey
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.InnerStreamKey),
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
      streamCipherId: SymmetricCipherMode.Salsa20,
      streamKey: Uint8Array.from(Uint8ArrayHelper.fromString('Test'.repeat(8))),
    } satisfies KdbxInnerHeader);
  });

  it('validates stream key length when mode is provided second', () => {
    // Arrange
    const data = Uint8Array.from(
      Buffer.concat([
        // InnerStreamKey
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.InnerStreamKey),
        Uint8ArrayHelper.fromUInt32LE(28),
        Uint8ArrayHelper.fromString('Test'.repeat(7)),

        // InnerStreamMode
        Uint8ArrayHelper.fromUInt8(InnerHeaderFieldId.InnerStreamMode),
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
      'InnerStreamMode',
      {
        field: InnerHeaderFieldId.InnerStreamMode,
        error:
          'Unexpected empty inner header field length for "InnerStreamMode"',
      },
    ],
    [
      'InnerStreamKey',
      {
        field: InnerHeaderFieldId.InnerStreamKey,
        error:
          'Unexpected empty inner header field length for "InnerStreamKey"',
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
      'Missing required inner header fields: "InnerStreamMode" and "InnerStreamKey"',
    );

    // Assert
    // Nothing to assert.
  });
});
