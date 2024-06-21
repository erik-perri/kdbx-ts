export default function deserializeMasterSeedValue(
  data: Uint8Array,
): Uint8Array {
  if (data.byteLength !== 32) {
    throw new Error(
      `Invalid master seed length. Expected 32 bytes, got ${data.byteLength}`,
    );
  }

  return data;
}
