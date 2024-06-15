import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import type SymmetricCipherMode from '../enums/SymmetricCipherMode';
import displayInnerHeaderFieldId from '../utilities/displayInnerHeaderFieldId';
import isInnerHeaderFieldId from '../utilities/isInnerHeaderFieldId';
import type Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import processInnerRandomStreamId from './processInnerRandomStreamId';
import { type BinaryPool } from './types';

export type KdbxInnerHeaderFields = {
  innerRandomStreamMode: SymmetricCipherMode;
  innerRandomStreamKey: Uint8Array;
  binaryPool: BinaryPool;
};

function isInnerHeaderFieldsComplete(
  header: Partial<KdbxInnerHeaderFields>,
): header is KdbxInnerHeaderFields {
  return (
    header.innerRandomStreamMode !== undefined &&
    header.innerRandomStreamKey !== undefined &&
    header.binaryPool !== undefined
  );
}

type KdbxInnerHeaderField = {
  id: InnerHeaderFieldId;
  data: Uint8Array;
};

function readInnerHeaderField(
  reader: Uint8ArrayCursorReader,
): KdbxInnerHeaderField {
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

export default function readInnerHeaderFields(
  reader: Uint8ArrayCursorReader,
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
        fields.innerRandomStreamMode = processInnerRandomStreamId(field.data);
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
