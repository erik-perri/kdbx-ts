import VariantMapFieldType from '../../../enums/VariantMapFieldType';
import { type KdbxVariantMapValues } from '../../../types/format';
import displayVariantMapFieldType from '../../../utilities/displayVariantMapFieldType';

export default function validateVariantValueNumeric(
  key: string,
  values: KdbxVariantMapValues,
): bigint {
  const data = values[key];

  if (data === undefined) {
    throw new Error(`Missing variant value for "${key}"`);
  }

  if (
    data.type !== VariantMapFieldType.Int32 &&
    data.type !== VariantMapFieldType.UInt32 &&
    data.type !== VariantMapFieldType.Int64 &&
    data.type !== VariantMapFieldType.UInt64
  ) {
    throw new Error(
      `Invalid variant value type found for "${key}". Expected Int32, UInt32, Int64, or UInt64, got ${displayVariantMapFieldType(data.type)}`,
    );
  }

  return BigInt(data.value);
}
