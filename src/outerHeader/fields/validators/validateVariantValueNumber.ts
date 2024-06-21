import VariantMapFieldType from '../../../enums/VariantMapFieldType';
import { type KdbxVariantMapValues } from '../../../types';
import displayVariantMapFieldType from '../../../utilities/displayVariantMapFieldType';

export default function validateVariantValueNumber(
  key: string,
  values: KdbxVariantMapValues,
): number {
  const data = values[key];

  if (data === undefined) {
    throw new Error(`Missing variant value for "${key}"`);
  }

  if (
    data.type !== VariantMapFieldType.Int32 &&
    data.type !== VariantMapFieldType.UInt32
  ) {
    throw new Error(
      `Invalid variant value type found for "${key}". Expected Int32 or UInt32, got ${displayVariantMapFieldType(data.type)}`,
    );
  }

  return data.value;
}
