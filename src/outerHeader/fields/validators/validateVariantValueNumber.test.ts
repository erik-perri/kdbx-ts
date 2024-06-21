import { describe, expect, it } from 'vitest';

import VariantMapFieldType from '../../../enums/VariantMapFieldType';
import { type KdbxVariantMapValues } from '../../../types';
import validateVariantValueNumber from './validateVariantValueNumber';

describe('validateVariantValueNumber', () => {
  it.each([
    [
      'signed',
      {
        value: -1024,
        values: {
          Value: {
            type: VariantMapFieldType.Int32,
            value: -1024,
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
    [
      'unsigned',
      {
        value: 1024,
        values: {
          Value: {
            type: VariantMapFieldType.UInt32,
            value: 1024,
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
  ])('returns the extracted %s value', (_, { value, values }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = validateVariantValueNumber('Value', values);

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
      'bigint when number is wanted',
      {
        error:
          'Invalid variant value type found for "Value". Expected Int32 or UInt32, got UInt64',
        key: 'Value',
        values: {
          Value: {
            type: VariantMapFieldType.UInt64,
            value: BigInt(1024),
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
  ])('fails if %s', (_, { error, key, values }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    expect(() => validateVariantValueNumber(key, values)).toThrowError(error);

    // Assert
    // Nothing to assert.
  });
});
