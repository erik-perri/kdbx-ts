import type { VariantMap } from '../version4/parseVariantMap';

export default function validateVariantFieldBigInt(
  key: string,
  variants: VariantMap,
  allowNumber: boolean = false,
): bigint {
  const variantData = variants[key];

  if (variantData === undefined) {
    throw new Error(`Missing variant value for ${key}`);
  }

  if (
    typeof variantData.value !== 'bigint' &&
    (!allowNumber || typeof variantData.value !== 'number')
  ) {
    throw new Error(
      `Invalid variant value type found for ${key}. Expected bigint, got ${typeof variantData.value}`,
    );
  }

  return BigInt(variantData.value);
}
