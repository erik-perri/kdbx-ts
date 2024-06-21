import VariantMapFieldType from '../../../enums/VariantMapFieldType';
import { type KdbxVariantMapValues } from '../../../types';
import displayVariantMapFieldType from '../../../utilities/displayVariantMapFieldType';

export default function validateVariantValueUint8Array(
  key: string,
  values: KdbxVariantMapValues,
): Uint8Array {
  const data = values[key];

  if (data === undefined) {
    throw new Error(`Missing variant value for "${key}"`);
  }

  if (data.type !== VariantMapFieldType.ByteArray) {
    throw new Error(
      `Invalid variant value type found for "${key}". Expected ByteArray, got ${displayVariantMapFieldType(data.type)}`,
    );
  }

  return data.value;
}
