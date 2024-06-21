import { describe, expect, it } from 'vitest';

import VariantMapFieldType from '../../../enums/VariantMapFieldType';
import { type KdbxVariantMapValues } from '../../../types';
import validateVariantValueNumeric from './validateVariantValueNumeric';

describe('validateVariantValueNumeric', () => {
  it.each([
    [
      'signed 32',
      {
        value: BigInt(-1024),
        values: {
          Value: {
            type: VariantMapFieldType.Int32,
            value: -1024,
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
    [
      'unsigned 32',
      {
        value: BigInt(1024),
        values: {
          Value: {
            type: VariantMapFieldType.UInt32,
            value: 1024,
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
    [
      'signed 64',
      {
        value: BigInt(-1024),
        values: {
          Value: {
            type: VariantMapFieldType.Int64,
            value: BigInt(-1024),
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
    [
      'unsigned 64',
      {
        value: BigInt(1024),
        values: {
          Value: {
            type: VariantMapFieldType.UInt64,
            value: BigInt(1024),
          },
        } satisfies KdbxVariantMapValues,
      },
    ],
  ])('returns the extracted %s value', (_, { value, values }) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = validateVariantValueNumeric('Value', values);

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
      'string when number is wanted',
      {
        error:
          'Invalid variant value type found for "Value". Expected Int32, UInt32, Int64, or UInt64, got String',
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
    expect(() => validateVariantValueNumeric(key, values)).toThrowError(error);

    // Assert
    // Nothing to assert.
  });
});
