import { describe, expect, it } from 'vitest';

import BufferReader from '../utilities/BufferReader';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import readHeaderHashes from './readHeaderHashes';

describe('readHeaderHashes', () => {
  it('returns the header hashes', () => {
    // Arrange
    const hash = Uint8ArrayHelper.fromString('Hash'.repeat(8));
    const hmacHash = Uint8ArrayHelper.fromString('HmacHash'.repeat(4));
    const data = Uint8Array.from(Buffer.concat([hash, hmacHash]));

    const reader = new BufferReader(data);

    // Act
    const result = readHeaderHashes(reader);

    // Assert
    expect(result.hash).toEqual(hash);
    expect(result.hmacHash).toEqual(hmacHash);
  });

  it('throws an error if the data is too short', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromString('Invalid');

    const reader = new BufferReader(data);

    // Act
    expect(() => readHeaderHashes(reader)).toThrowError(
      'Invalid header hashes length. Expected at least 64 bytes, got 7',
    );

    // Assert
    // Nothing to assert.
  });
});
