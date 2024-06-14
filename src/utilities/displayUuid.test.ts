import { describe, expect, it } from 'vitest';

import displayUuid from './displayUuid';

describe('displayUuid', () => {
  it('throws error when unknown size', () => {
    // Arrange
    const bytes = Uint8Array.from([0x01, 0x02, 0x03]);

    // Act
    expect(() => displayUuid(bytes)).toThrowError(
      'Unexpected UUID length. Expected 16 bytes, got 3',
    );

    // Assert
    // No assertions.
  });

  it('displays correctly', () => {
    // Arrange
    const bytes = Uint8Array.from([
      0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c,
      0x0d, 0x0e, 0x0f, 0x10,
    ]);

    // Act
    const result = displayUuid(bytes);

    // Assert
    expect(result).toBe('01020304-0506-0708-090a-0b0c0d0e0f10');
  });
});
