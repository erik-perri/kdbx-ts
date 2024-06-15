import type { VariantMap } from '../version4/parseVariantMap';

export default function validateVariantFieldUint8Array(
  key: string,
  variants: VariantMap,
): Uint8Array {
  const variantData = variants[key];

  if (variantData === undefined) {
    throw new Error(`Missing variant value for ${key}`);
  }

  if (!ArrayBuffer.isView(variantData.value)) {
    throw new Error(
      `Invalid variant value type found for ${key}. Expected Uint8Array, got ${typeof variantData.value}`,
    );
  }

  return variantData.value;
}
