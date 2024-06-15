import type { VariantFieldMap } from '../version4/parseVariantMap';

export default function validateVariantFieldUint8Array(
  key: string,
  variants: VariantFieldMap,
): Uint8Array {
  const value = variants[key];

  if (!ArrayBuffer.isView(value)) {
    throw new Error(
      `Invalid variant value type found for ${key}. Expected Uint8Array, got ${typeof value}`,
    );
  }

  return value;
}
