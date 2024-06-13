import { describe, expect, it } from 'vitest';

import PasswordKey from './PasswordKey';

describe('PasswordKey', () => {
  describe('setKey', () => {
    it('clones the input array', async () => {
      // Arrange
      const key = new PasswordKey();
      const password = Uint8Array.from([
        0x5e, 0x88, 0x48, 0x98, 0xda, 0x28, 0x4, 0x71, 0x51, 0xd0, 0xe5, 0x6f,
        0x8d, 0xc6, 0x29, 0x27, 0x73, 0x60, 0x3d, 0xd, 0x6a, 0xab, 0xbd, 0xd6,
        0x2a, 0x11, 0xef, 0x72, 0x1d, 0x15, 0x42, 0xd8,
      ]);

      // Act
      await key.setKey(password);
      const data = await key.getKey();

      // Assert
      expect(data).toEqual(password);
      expect(data).not.toBe(password);
    });

    it('throws an error if the input does not resemble a SHA256 hash', async () => {
      // Arrange
      const key = new PasswordKey();
      const password = new Uint8Array(0);

      // Act
      await expect(key.setKey(password)).rejects.toThrow(
        'Invalid SHA256 password key. 32 bytes expected, 0 found.',
      );

      // Assert
      // No assertions.
    });
  });

  describe('getKey', () => {
    it('pretends to be initialized with an empty key', async () => {
      // Arrange
      const key = new PasswordKey();

      // Act
      const data = await key.getKey();

      // Assert
      expect(data).toEqual(new Uint8Array(0));
    });
  });
});
