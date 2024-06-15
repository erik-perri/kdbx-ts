import type { VariantMap } from '../version4/parseVariantMap';

export default function validateVariantFieldNumber(
  key: string,
  variants: VariantMap,
): number {
  const variantData = variants[key];

  if (variantData === undefined) {
    throw new Error(`Missing variant value for ${key}`);
  }

  if (typeof variantData.value !== 'number') {
    throw new Error(
      `Invalid variant value type found for ${key}. Expected number, got ${typeof variantData.value}`,
    );
  }

  return variantData.value;
}
