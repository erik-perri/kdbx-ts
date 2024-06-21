import VariantMapFieldType from '../../enums/VariantMapFieldType';
import { type KdbxVariantMap, type KdbxVariantMapValues } from '../../types';
import BufferReader from '../../utilities/BufferReader';
import isVariantMapFieldType from '../../utilities/isVariantMapFieldType';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import { KeePass2 } from '../../versions';

export default function deserializeVariantMapValue(
  data: Uint8Array,
): KdbxVariantMap {
  const reader = new BufferReader(data);
  const version = reader.readUInt16LE();
  const majorVersion = version & KeePass2.variantMapCriticalMask;

  const maxVersion =
    KeePass2.variantMapVersion & KeePass2.variantMapCriticalMask;
  if (majorVersion > maxVersion) {
    throw new Error(
      `Invalid variant map version. Expected less than max ${maxVersion}, got ${majorVersion}`,
    );
  }

  const values: KdbxVariantMapValues = {};

  for (;;) {
    const type = reader.readUInt8();
    if (!isVariantMapFieldType(type)) {
      throw new Error(`Invalid variant map field type "${type}"`);
    }

    if (type === VariantMapFieldType.End) {
      break;
    }

    const nameLength = reader.readUInt32LE();
    const nameBytes = reader.readBytes(nameLength);

    if (nameBytes.byteLength !== nameLength) {
      throw new Error(
        `Invalid variant map entry name data. Expected ${nameLength} bytes, got ${nameBytes.byteLength}`,
      );
    }

    const name = Uint8ArrayHelper.toString(nameBytes);

    const valueLength = reader.readUInt32LE();
    const valueBytes = reader.readBytes(valueLength);

    if (valueBytes.byteLength !== valueLength) {
      throw new Error(
        `Invalid variant map entry value data. Expected ${valueLength} bytes, got ${valueBytes.byteLength}`,
      );
    }

    switch (type) {
      case VariantMapFieldType.Bool:
        if (valueLength !== 1) {
          throw new Error(
            `Invalid variant map Bool entry value length. Expected 1 byte, got ${valueLength}`,
          );
        }

        values[name] = {
          type,
          value: valueBytes.at(0) !== 0,
        };
        break;

      case VariantMapFieldType.Int32:
        if (valueLength !== 4) {
          throw new Error(
            `Invalid variant map Int32 entry value length. Expected 4 bytes, got ${valueLength}`,
          );
        }

        values[name] = {
          type,
          value: Uint8ArrayHelper.toInt32LE(valueBytes),
        };
        break;

      case VariantMapFieldType.UInt32:
        if (valueLength !== 4) {
          throw new Error(
            `Invalid variant map UInt32 entry value length. Expected 4 bytes, got ${valueLength}`,
          );
        }

        values[name] = {
          type,
          value: Uint8ArrayHelper.toUInt32LE(valueBytes),
        };
        break;

      case VariantMapFieldType.Int64:
        if (valueLength !== 8) {
          throw new Error(
            `Invalid variant map Int64 entry value length. Expected 8 bytes, got ${valueLength}`,
          );
        }

        values[name] = {
          type,
          value: Uint8ArrayHelper.toInt64LE(valueBytes),
        };
        break;

      case VariantMapFieldType.UInt64:
        if (valueLength !== 8) {
          throw new Error(
            `Invalid variant map UInt64 entry value length. Expected 8 bytes, got ${valueLength}`,
          );
        }

        values[name] = {
          type,
          value: Uint8ArrayHelper.toUInt64LE(valueBytes),
        };
        break;

      case VariantMapFieldType.String:
        values[name] = {
          type,
          value: Uint8ArrayHelper.toString(valueBytes),
        };
        break;

      case VariantMapFieldType.ByteArray:
        values[name] = {
          type,
          value: valueBytes,
        };
        break;
    }
  }

  return { values, version };
}
