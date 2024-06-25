import { describe, expect, it } from 'vitest';

import VariantMapFieldType from '../../../enums/VariantMapFieldType';
import { type KdbxVariantMapValues } from '../../../types/format';
import Uint8ArrayHelper from '../../../utilities/Uint8ArrayHelper';
import validateVariantValueUint8Array from './validateVariantValueUint8Array';

describe('validateVariantValueUint8Array', () => {
  it('returns the extracted value', () => {
    // Arrange
    const value = Uint8ArrayHelper.fromString('Test');
    const values: KdbxVariantMapValues = {
      Value: {
        type: VariantMapFieldType.ByteArray,
        value,
      },
    };

    // Act
    const result = validateVariantValueUint8Array('Value', values);

    // Assert
    expect(result).toBe(value);
  });

  it.each([
    [
      'missing in variant map',
      {
        error: 'Missing variant value for "what"',
        key: 'what',
        values: {} satisfies KdbxVariantMapValues,
      },
    ],
    [
      'string when array is wanted',
      {
        error:
          'Invalid variant value type found for "Value". Expected ByteArray, got String',
        key: 'Value',
        values: {
          Value: {
            type: VariantMapFieldType.String,
            value: 'Test',
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
  ])('fails if %s', (_, { error, key, values }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    expect(() => validateVariantValueUint8Array(key, values)).toThrowError(
      error,
    );

    // Assert
    // Nothing to assert.
  });
});
