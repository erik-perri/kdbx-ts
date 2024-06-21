import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import serializeSignature from './serializeSignature';

describe('serializeSignature', () => {
  it('serializes the signature', () => {
    // Arrange
    const signature = {
      signature1: 0x9aa2d903,
      signature2: 0xb54bfb67,
      versionMajor: 4,
      versionMinor: 0,
    };

    const expectedResult = Uint8Array.from(
      Buffer.concat([
        Uint8ArrayHelper.fromUInt32LE(signature.signature1),
        Uint8ArrayHelper.fromUInt32LE(signature.signature2),
        Uint8ArrayHelper.fromUInt16LE(signature.versionMinor),
        Uint8ArrayHelper.fromUInt16LE(signature.versionMajor),
      ]),
    );

    // Act
    const result = serializeSignature(signature);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
