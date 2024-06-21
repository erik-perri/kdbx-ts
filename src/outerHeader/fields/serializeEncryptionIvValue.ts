export default function serializeEncryptionIvValue(
  data: Uint8Array,
): Uint8Array {
  // Encryption IV value is not serialized
  return data;
}
