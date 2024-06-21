import VariantMapFieldType from '../../enums/VariantMapFieldType';
import { type KdbxVariantMap, type KdbxVariantMapValue } from '../../types';
import BufferWriter from '../../utilities/BufferWriter';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

export default function serializeVariantMapValue(
  variantMap: KdbxVariantMap,
): Uint8Array {
  const writer = new BufferWriter();

  writer.writeUInt16LE(variantMap.version);

  for (const [key, value] of Object.entries(variantMap.values)) {
    if (value === undefined) {
      continue;
    }

    const data = serializeVariantMapField(value);

    writer.writeUInt8(value.type);
    writer.writeInt32LE(key.length);
    writer.writeBytes(Uint8ArrayHelper.fromString(key));
    writer.writeInt32LE(data.byteLength);
    writer.writeBytes(data);
  }

  writer.writeUInt8(VariantMapFieldType.End);

  return writer.toUint8Array();
}

function serializeVariantMapField(data: KdbxVariantMapValue): Uint8Array {
  switch (data.type) {
    case VariantMapFieldType.Bool:
      return Uint8ArrayHelper.fromString(data.value ? '1' : '0');

    case VariantMapFieldType.ByteArray:
      return Uint8Array.from(data.value);

    case VariantMapFieldType.Int32:
      return Uint8ArrayHelper.fromInt32LE(data.value);

    case VariantMapFieldType.Int64:
      return Uint8ArrayHelper.fromInt64LE(data.value);

    case VariantMapFieldType.String:
      return Uint8ArrayHelper.fromString(data.value);

    case VariantMapFieldType.UInt32:
      return Uint8ArrayHelper.fromUInt32LE(data.value);

    case VariantMapFieldType.UInt64:
      return Uint8ArrayHelper.fromUInt64LE(data.value);

    case VariantMapFieldType.End:
      return new Uint8Array(0);
  }
}
