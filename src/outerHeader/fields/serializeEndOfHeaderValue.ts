export default function serializeEndOfHeaderValue(
  data: Uint8Array,
): Uint8Array {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid end of header length. Expected 4 bytes, got ${data.byteLength}`,
    );
  }

  // End of header value is not serialized
  return data;
}
