import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import type SymmetricCipherMode from '../enums/SymmetricCipherMode';
import displayInnerHeaderFieldId from '../utilities/displayInnerHeaderFieldId';
import isInnerHeaderFieldId from '../utilities/isInnerHeaderFieldId';
import type Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import processInnerRandomStreamId from './processInnerRandomStreamId';

export type KdbxInnerHeaderFields = {
  innerRandomStreamMode: SymmetricCipherMode;
  innerRandomStreamKey: Uint8Array;
  binaryPools: Record<string, Uint8Array>;
};

function isInnerHeaderFieldsComplete(
  header: Partial<KdbxInnerHeaderFields>,
): header is KdbxInnerHeaderFields {
  return (
    header.innerRandomStreamMode !== undefined &&
    header.innerRandomStreamKey !== undefined &&
    header.binaryPools !== undefined
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
    throw new Error(`Unexpected inner header field ID "${id}"`);
  }

  const fieldLength = reader.readUInt32LE();

  if (id === InnerHeaderFieldId.End) {
    return { id, data: Uint8Array.from([]) };
  }

  const data = reader.readBytes(fieldLength);

  if (data.byteLength !== fieldLength) {
    throw new Error(
      `Unexpected inner header data length for ${displayInnerHeaderFieldId(id)}. Expected ${fieldLength}, got ${data.byteLength}`,
    );
  }

  return { id, data };
}

export default function readInnerHeaderFields(
  reader: Uint8ArrayCursorReader,
): KdbxInnerHeaderFields {
  const fields: Partial<KdbxInnerHeaderFields> &
    Pick<KdbxInnerHeaderFields, 'binaryPools'> = {
    binaryPools: {},
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
            'Unexpected inner header binary size. Expected at least 1 byte',
          );
        }

        const next = Object.keys(fields.binaryPools).length;
        fields.binaryPools[`${next}`] = field.data.subarray(1);
        break;
      }
    }
  }

  if (!isInnerHeaderFieldsComplete(fields)) {
    throw new Error('Incomplete inner header fields');
  }

  return fields;
}
