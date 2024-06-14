import type {
  VariantFieldMap,
  VariantFieldTypes,
} from '../version4/parseVariantMap';

export default function processVariantFieldNumber(
  key: string,
  variants: VariantFieldMap,
): number {
  const value: VariantFieldTypes | undefined = variants[key];

  if (typeof value !== 'number') {
    throw new Error(
      `Invalid variant value type found for ${key}. Expected number, got ${typeof value}`,
    );
  }

  return value;
}
