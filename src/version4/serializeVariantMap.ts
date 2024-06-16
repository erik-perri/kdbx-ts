import VariantMapFieldType from '../enums/VariantMapFieldType';
import { KeePass2 } from '../header/versions';
import BufferWriter from '../utilities/BufferWriter';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import { type VariantMap, type VariantMapData } from './types';

export default function serializeVariantMap(data: VariantMap): Uint8Array {
  const writer = new BufferWriter();

  writer.writeUInt16LE(KeePass2.variantMapVersion);

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      continue;
    }

    const data = serializeVariantMapField(value);

    writer.writeInt8(value.type);
    writer.writeInt32LE(key.length);
    writer.writeBytes(Uint8ArrayHelper.fromString(key));
    writer.writeInt32LE(data.byteLength);
    writer.writeBytes(data);
  }

  writer.writeInt8(VariantMapFieldType.End);

  return writer.toUint8Array();
}

function serializeVariantMapField(data: VariantMapData): Uint8Array {
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
