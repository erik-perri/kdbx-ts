import { describe, expect, it } from 'vitest';

import BufferReader from '../utilities/BufferReader';
import readSignature from './readSignature';

describe('readSignature', () => {
  it('returns the read signature', () => {
    // Arrange
    const data = Uint8Array.from([
      0x03, 0xd9, 0xa2, 0x9a, 0x67, 0xfb, 0x4b, 0xb5, 0x00, 0x00, 0x04, 0x00,
    ]);

    const reader = new BufferReader(data);

    // Act
    const result = readSignature(reader);

    // Assert
    expect(result).toEqual({
      signature1: 0x9aa2d903,
      signature2: 0xb54bfb67,
      versionMajor: 4,
      versionMinor: 0,
    });
  });

  it('throws an error if the data is too short', () => {
    // Arrange
    const data = Uint8Array.from([0x00, 0x00, 0x00]);

    const reader = new BufferReader(data);

    // Act
    expect(() => readSignature(reader)).toThrowError(
      'Unable to parse signature. Expected at least 12 bytes, got 3',
    );

    // Assert
    // Nothing to assert.
  });
});
