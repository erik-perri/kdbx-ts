import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import ProtectedStreamAlgorithm from '../enums/ProtectedStreamAlgorithm';
import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import type BufferReader from '../utilities/BufferReader';
import displayInnerHeaderFieldId from '../utilities/displayInnerHeaderFieldId';
import isInnerHeaderFieldId from '../utilities/isInnerHeaderFieldId';
import isProtectedStreamAlgorithm from '../utilities/isProtectedStreamAlgorithm';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import { type KdbxInnerHeaderFields } from './types';

type KdbxInnerHeaderField = {
  id: InnerHeaderFieldId;
  data: Uint8Array;
};

export default function readInnerHeaderFields(
  reader: BufferReader,
): KdbxInnerHeaderFields {
  const fields: Partial<KdbxInnerHeaderFields> &
    Pick<KdbxInnerHeaderFields, 'binaryPool'> = {
    binaryPool: {},
  };

  for (;;) {
    const field = readInnerHeaderField(reader);

    if (field.id === InnerHeaderFieldId.End) {
      break;
    }

    switch (field.id) {
      case InnerHeaderFieldId.InnerRandomStreamID:
        fields.innerRandomStreamMode = validateInnerRandomStreamId(field.data);
        break;

      case InnerHeaderFieldId.InnerRandomStreamKey:
        fields.innerRandomStreamKey = field.data;
        break;

      case InnerHeaderFieldId.Binary: {
        if (field.data.byteLength < 1) {
          throw new Error(
            'Invalid inner header binary size. Expected at least 1 byte',
          );
        }

        const next = Object.keys(fields.binaryPool).length;
        fields.binaryPool[`${next}`] = field.data.subarray(1);
        break;
      }
    }
  }

  if (!isInnerHeaderFieldsComplete(fields)) {
    throw new Error('Incomplete inner header fields');
  }

  return fields;
}

function readInnerHeaderField(reader: BufferReader): KdbxInnerHeaderField {
  const id = reader.readInt8();
  if (!isInnerHeaderFieldId(id)) {
    throw new Error(`Invalid inner header field ID "${id}"`);
  }

  const fieldLength = reader.readUInt32LE();

  if (id === InnerHeaderFieldId.End) {
    return { id, data: Uint8Array.from([]) };
  }

  const data = reader.readBytes(fieldLength);

  if (data.byteLength !== fieldLength) {
    throw new Error(
      `Invalid inner header data length for ${displayInnerHeaderFieldId(id)}. Expected ${fieldLength} bytes, got ${data.byteLength}`,
    );
  }

  return { id, data };
}

function validateInnerRandomStreamId(data: Uint8Array): SymmetricCipherMode {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid random stream ID length. Expected 4 bytes, got ${data.byteLength}`,
    );
  }

  const id = Uint8ArrayHelper.toUInt32LE(data);
  const unsupportedAlgorithms: number[] = [
    ProtectedStreamAlgorithm.Invalid,
    ProtectedStreamAlgorithm.ArcFourVariant,
  ];

  if (!isProtectedStreamAlgorithm(id) || unsupportedAlgorithms.includes(id)) {
    throw new Error(`Invalid inner random stream cipher ID "${id}"`);
  }

  switch (id) {
    case ProtectedStreamAlgorithm.Salsa20:
      return SymmetricCipherMode.Salsa20;
    case ProtectedStreamAlgorithm.ChaCha20:
      return SymmetricCipherMode.ChaCha20;
    default:
      throw new Error(`Unsupported inner random stream cipher ID "${id}"`);
  }
}

function isInnerHeaderFieldsComplete(
  header: Partial<KdbxInnerHeaderFields>,
): header is KdbxInnerHeaderFields {
  return (
    header.innerRandomStreamMode !== undefined &&
    header.innerRandomStreamKey !== undefined &&
    header.binaryPool !== undefined
  );
}
