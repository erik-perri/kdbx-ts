import { describe, expect, it } from 'vitest';

import VariantMapFieldType from '../../../enums/VariantMapFieldType';
import { type KdbxVariantMapValues } from '../../../types';
import validateVariantValueBigInt from './validateVariantValueBigInt';

describe('validateVariantValueBigInt', () => {
  it.each([
    [
      'signed',
      {
        value: BigInt(-1),
        values: {
          Value: {
            type: VariantMapFieldType.Int64,
            value: BigInt(-1),
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
    [
      'unsigned',
      {
        value: BigInt(1),
        values: {
          Value: {
            type: VariantMapFieldType.UInt64,
            value: BigInt(1),
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
  ])('returns the extracted %s value', (_, { value, values }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = validateVariantValueBigInt('Value', values);

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
      'number when bigint is wanted',
      {
        error:
          'Invalid variant value type found for "Value". Expected Int64 or UInt64, got UInt32',
        key: 'Value',
        values: {
          Value: {
            type: VariantMapFieldType.UInt32,
            value: 36,
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
  ])('fails if %s', (_, { error, key, values }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    expect(() => validateVariantValueBigInt(key, values)).toThrowError(error);

    // Assert
    // Nothing to assert.
  });
});
