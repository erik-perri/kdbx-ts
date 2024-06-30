import { describe, expect, it, vitest } from 'vitest';

import HashAlgorithm from '../enums/HashAlgorithm';
import generateHmacKeySeed from './generateHmacKeySeed';
import * as processHash from './processHash';

describe('getHmacKeySeed', () => {
  it('should create key using the expected pattern ', async () => {
    // The key for the HMAC-SHA-256 hash of the i-th block (zero-based index, type UInt64)
    // of the HMAC-protected block stream is: SHA-512(i ‖ SHA-512(S ‖ T ‖ 0x01)).

    // Arrange
    const seed = Uint8Array.from([1]);
    const key = Uint8Array.from([2]);

    const hashSpy = vitest
      .spyOn(processHash, 'default')
      .mockResolvedValue(Uint8Array.from([]));

    // Act
    await generateHmacKeySeed(seed, key);

    // Assert
    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith(HashAlgorithm.Sha512, [
      seed,
      key,
      Uint8Array.from([0x01]),
    ]);
  });
});
