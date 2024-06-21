import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeEndOfHeaderValue from './deserializeEndOfHeaderValue';

describe('deserializeEndOfHeaderValue', () => {
  it('does not modify data', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromString('\r\n\r\n');

    // Act
    const result = deserializeEndOfHeaderValue(data);

    // Assert
    expect(result).toEqual(data);
  });

  it('throws an error when the data is unexpected', () => {
    // Arrange
    const data = Uint8Array.from([0x00, 0x01, 0x02, 0x03]);

    // Act
    expect(() => deserializeEndOfHeaderValue(data)).toThrowError(
      'Unexpected end of header field data',
    );

    // Assert
    // Nothing to assert.
  });

  it('throws an error when the data is incorrect size', () => {
    // Arrange
    const data = Uint8Array.from([0x00]);

    // Act
    expect(() => deserializeEndOfHeaderValue(data)).toThrowError(
      'Invalid end of header field data length. Expected 4 bytes, got 1',
    );

    // Assert
    // Nothing to assert.
  });
});
