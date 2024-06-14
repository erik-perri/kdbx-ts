const VariantMapFieldType = Object.freeze({
  End: 0x00,
  UInt32: 0x04,
  UInt64: 0x05,
  Bool: 0x08,
  Int32: 0x0c,
  Int64: 0x0d,
  String: 0x18,
  ByteArray: 0x42,
} as const);

type VariantMapFieldType =
  (typeof VariantMapFieldType)[keyof typeof VariantMapFieldType];

export default VariantMapFieldType;
