import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeBinaryValue from './deserializeBinaryValue';

describe('deserializeBinaryValue', () => {
  it.each([
    ['protected', { protectedFlag: 0x01, expected: true }],
    ['unprotected', { protectedFlag: 0x00, expected: false }],
  ])('reads %s flag and data', (_, { expected, protectedFlag }) => {
    // Arrange
    const data = Uint8Array.from(
      Buffer.concat([
        Uint8ArrayHelper.fromUInt8(protectedFlag),
        Uint8ArrayHelper.fromString('Test'),
      ]),
    );

    // Act
    const result = deserializeBinaryValue(data);

    // Assert
    expect(result).toEqual({
      data: Uint8ArrayHelper.fromString('Test'),
      protectInMemory: expected,
    });
  });

  it('throws an error when the data is incorrect size', () => {
    // Arrange
    const data = Uint8Array.from([]);

    // Act
    expect(() => deserializeBinaryValue(data)).toThrowError(
      'Invalid binary value length. Expected at least 1 byte, got 0',
    );

    // Assert
    // Nothing to assert.
  });

  it('throws an error when the protect in memory flag is invalid', () => {
    // Arrange
    const data = Uint8Array.from([0x02]);

    // Act
    expect(() => deserializeBinaryValue(data)).toThrowError(
      'Unexpected protect in memory binary flag. Expected 0x00 or 0x01, got 0x2',
    );

    // Assert
    // Nothing to assert.
  });
});
