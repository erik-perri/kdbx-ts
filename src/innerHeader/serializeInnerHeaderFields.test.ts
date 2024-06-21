import { describe, expect, it } from 'vitest';

import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import ProtectedStreamAlgorithm from '../enums/ProtectedStreamAlgorithm';
import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import { type KdbxInnerHeader } from '../types';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import serializeInnerHeaderFields from './serializeInnerHeaderFields';

describe('serializeInnerHeaderFields', () => {
  it('serializes inner header fields', () => {
    // Arrange
    const header: KdbxInnerHeader = {
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
    };

    const expectedResult = Uint8Array.from(
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

    // Act
    const result = serializeInnerHeaderFields(header);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
