import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeEndOfHeaderValue from './deserializeEndOfHeaderValue';

describe('deserializeEndOfHeaderValue', () => {
  it('does not modify data', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromString('\r\n');

    // Act
    const result = deserializeEndOfHeaderValue(data);

    // Assert
    expect(result).toEqual(data);
  });
});
