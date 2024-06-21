export default function deserializeEncryptionIvValue(
  data: Uint8Array,
): Uint8Array {
  // Encryption IV value is not serialized
  return data;
}
