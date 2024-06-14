import type {
  VariantFieldMap,
  VariantFieldTypes,
} from '../version4/parseVariantMap';

export default function processVariantFieldBigInt(
  key: string,
  variants: VariantFieldMap,
  allowNumber: boolean = false,
): bigint {
  const value: VariantFieldTypes | undefined = variants[key];

  if (
    typeof value !== 'bigint' &&
    (!allowNumber || typeof value !== 'number')
  ) {
    throw new Error(
      `Invalid variant value type found for ${key}. Expected bigint, got ${typeof value}`,
    );
  }

  return BigInt(value);
}
