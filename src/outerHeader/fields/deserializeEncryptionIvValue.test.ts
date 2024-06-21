import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import deserializeEncryptionIvValue from './deserializeEncryptionIvValue';

describe('deserializeEncryptionIvValue', () => {
  it('does not modify data', () => {
    // Arrange
    const data = Uint8ArrayHelper.fromString('Test'.repeat(8));

    // Act
    const result = deserializeEncryptionIvValue(data);

    // Assert
    expect(result).toEqual(data);
  });
});
