import { describe, expect, it, vitest } from 'vitest';

import nodeCrypto from '../../fixtures/crypto/nodeCrypto';
import BufferReader from '../utilities/BufferReader';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import readHmacHashedBlocks from './readHmacHashedBlocks';

describe('readHmacHashedBlocks', () => {
  it('should read until the end block then return the combined data', async () => {
    // Arrange
    const buffer = Uint8Array.from(
      Buffer.concat([
        // Block 0
        new Uint8Array(32),
        Uint8ArrayHelper.fromInt32LE(1),
        Uint8Array.from([1]),

        // Block 1
        new Uint8Array(32),
        Uint8ArrayHelper.fromInt32LE(2),
        Uint8Array.from([2, 2]),

        // Block 2
        new Uint8Array(32),
        Uint8ArrayHelper.fromInt32LE(3),
        Uint8Array.from([3, 3, 3]),

        // End
        new Uint8Array(32),
        Uint8ArrayHelper.fromInt32LE(0),
      ]),
    );
    const key = new Uint8Array(64);
    const reader = new BufferReader(buffer);

    const hmacSpy = vitest
      .spyOn(nodeCrypto, 'hmac')
      .mockResolvedValue(new Uint8Array(32));

    // Act
    const result = await readHmacHashedBlocks(nodeCrypto, reader, key);

    // Assert
    expect(result).toEqual(Uint8Array.from([1, 2, 2, 3, 3, 3]));
    expect(hmacSpy).toHaveBeenCalledTimes(4);
  });

  it('should throw error if not provided a big enough buffer', async () => {
    // Arrange
    const buffer = new Uint8Array(0);
    const key = new Uint8Array(0);
    const reader = new BufferReader(buffer);

    // Act
    await expect(async () =>
      readHmacHashedBlocks(nodeCrypto, reader, key),
    ).rejects.toThrowError(
      'Invalid HMAC hashed blocks data length. Expected at least 36 bytes, got 0',
    );

    // Assert
    // Nothing to assert.
  });

  it('should throw error if provided a negative block length', async () => {
    // Arrange
    const buffer = Uint8Array.from(
      Buffer.concat([new Uint8Array(32), Uint8ArrayHelper.fromInt32LE(-123)]),
    );
    const key = new Uint8Array(0);
    const reader = new BufferReader(buffer);

    // Act
    await expect(async () =>
      readHmacHashedBlocks(nodeCrypto, reader, key),
    ).rejects.toThrowError(
      'Invalid block size. Expected a number greater than or equal to 0, got -123',
    );

    // Assert
    // Nothing to assert.
  });

  it('should throw an error when a block hmac does not match', async () => {
    // Arrange
    const buffer = Uint8Array.from(
      Buffer.concat([
        // Block 0
        new Uint8Array(32),
        Uint8ArrayHelper.fromInt32LE(1),
        new Uint8Array(1),

        // Block 1
        new Uint8Array(32),
        Uint8ArrayHelper.fromInt32LE(1),
        new Uint8Array(1),

        // End
        new Uint8Array(32),
        Uint8ArrayHelper.fromInt32LE(0),
      ]),
    );
    const key = new Uint8Array(64);
    const reader = new BufferReader(buffer);

    const hmacSpy = vitest
      .spyOn(nodeCrypto, 'hmac')
      .mockResolvedValueOnce(new Uint8Array(32))
      .mockResolvedValueOnce(
        Uint8Array.from(Array.from({ length: 32 }, (_, i) => i)),
      );

    // Act
    await expect(async () =>
      readHmacHashedBlocks(nodeCrypto, reader, key),
    ).rejects.toThrowError('HMAC mismatch on block 1');

    // Assert
    expect(hmacSpy).toHaveBeenCalledTimes(2);
  });
});
