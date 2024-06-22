import { describe, expect, it, vitest } from 'vitest';

import nodeCrypto from '../../fixtures/crypto/nodeCrypto';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import serializeHmacHashedBlocks from './serializeHmacHashedBlocks';

describe('serializeHmacHashedBlocks', () => {
  it('should hash blocks and include the empty ending block', async () => {
    // Arrange
    const data = Uint8Array.from([0x01, 0x02, 0x03]);
    const key = new Uint8Array(64);

    const hashOne = Uint8Array.from(Array.from({ length: 32 }, () => 1));
    const hashTwo = Uint8Array.from(Array.from({ length: 32 }, () => 2));

    const hmacSpy = vitest
      .spyOn(nodeCrypto, 'hmac')
      .mockResolvedValueOnce(hashOne)
      .mockResolvedValueOnce(hashTwo);

    // Act
    const result = await serializeHmacHashedBlocks(nodeCrypto, data, key);

    // Assert
    expect(result).toEqual(
      Uint8Array.from(
        Buffer.concat([
          hashOne,
          Uint8ArrayHelper.fromUInt32LE(3),
          data,
          hashTwo,
          Uint8ArrayHelper.fromUInt32LE(0),
        ]),
      ),
    );

    expect(hmacSpy).toHaveBeenCalledTimes(2);
  });

  it('should split to 1mb blocks', async () => {
    // Arrange
    const data = new Uint8Array(1024 * 1024 + 16);
    const key = new Uint8Array(64);

    const hashSpy = vitest
      .spyOn(nodeCrypto, 'hmac')
      .mockResolvedValue(new Uint8Array(32));

    // Act
    const result = await serializeHmacHashedBlocks(nodeCrypto, data, key);

    // Assert
    expect(result.byteLength).toEqual(
      1024 * 1024 + 16 + 32 + 4 + 32 + 4 + 32 + 4,
    );
    expect(hashSpy).toHaveBeenCalledTimes(3);
  });
});
