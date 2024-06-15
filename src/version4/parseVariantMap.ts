import VariantMapFieldType from '../enums/VariantMapFieldType';
import isVariantMapFieldType from '../utilities/isVariantMapFieldType';
import Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import Uint8ArrayReader from '../utilities/Uint8ArrayReader';

export type VariantFieldTypes = boolean | bigint | number | string | Uint8Array;

export type VariantFieldMap = {
  [key: string]: VariantFieldTypes | undefined;
};

export default function parseVariantMap(data: Uint8Array): VariantFieldMap {
  const VARIANTMAP_VERSION = 0x0100;
  const VARIANTMAP_CRITICAL_MASK = 0xff00;

  const reader = new Uint8ArrayCursorReader(data);
  const version = reader.readUInt16LE() & VARIANTMAP_CRITICAL_MASK;

  const maxVersion = VARIANTMAP_VERSION & VARIANTMAP_CRITICAL_MASK;
  if (version > maxVersion) {
    throw new Error(
      `Invalid variant map version. Expected less than max ${maxVersion}, got ${version}`,
    );
  }
  const map: VariantFieldMap = {};

  for (;;) {
    const fieldType = reader.readInt8();
    if (!isVariantMapFieldType(fieldType)) {
      throw new Error(`Invalid variant map field type "${fieldType}"`);
    }

    if (fieldType === VariantMapFieldType.End) {
      break;
    }

    const nameLength = reader.readUInt32LE();
    let nameBytes = new Uint8Array(0);
    if (nameLength) {
      nameBytes = reader.readBytes(nameLength);
      if (nameBytes.byteLength !== nameLength) {
        throw new Error(
          `Invalid variant map entry name data. Expected ${nameLength} bytes, got ${nameBytes.byteLength}`,
        );
      }
    }
    const name = Uint8ArrayReader.toString(nameBytes);

    const valueLength = reader.readUInt32LE();
    let valueBytes = new Uint8Array(0);
    if (valueLength) {
      valueBytes = reader.readBytes(valueLength);
      if (valueBytes.byteLength !== valueLength) {
        throw new Error(
          `Invalid variant map entry value data. Expected ${valueLength} bytes, got ${valueBytes.byteLength}`,
        );
      }
    }

    switch (fieldType) {
      case VariantMapFieldType.Bool:
        if (valueLength !== 1) {
          throw new Error(
            `Invalid variant map Bool entry value length. Expected 1 byte, got ${valueLength}`,
          );
        }

        map[name] = valueBytes.at(0) !== 0;
        break;

      case VariantMapFieldType.Int32:
        if (valueLength !== 4) {
          throw new Error(
            `Invalid variant map Int32 entry value length. Expected 4 bytes, got ${valueLength}`,
          );
        }

        map[name] = Uint8ArrayReader.toInt32LE(valueBytes);
        break;

      case VariantMapFieldType.UInt32:
        if (valueLength !== 4) {
          throw new Error(
            `Invalid variant map UInt32 entry value length. Expected 4 bytes, got ${valueLength}`,
          );
        }

        map[name] = Uint8ArrayReader.toUInt32LE(valueBytes);
        break;

      case VariantMapFieldType.Int64:
        if (valueLength !== 8) {
          throw new Error(
            `Invalid variant map Int64 entry value length. Expected 8 bytes, got ${valueLength}`,
          );
        }

        map[name] = Uint8ArrayReader.toInt64LE(valueBytes);
        break;

      case VariantMapFieldType.UInt64:
        if (valueLength !== 8) {
          throw new Error(
            `Invalid variant map UInt64 entry value length. Expected 8 bytes, got ${valueLength}`,
          );
        }

        map[name] = Uint8ArrayReader.toUInt64LE(valueBytes);
        break;

      case VariantMapFieldType.String:
        map[name] = Uint8ArrayReader.toString(valueBytes);
        break;

      case VariantMapFieldType.ByteArray:
        map[name] = valueBytes;
        break;
    }
  }

  return map;
}
