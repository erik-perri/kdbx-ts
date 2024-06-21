import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import { type KdbxInnerHeader } from '../types';
import type BufferReader from '../utilities/BufferReader';
import displayInnerHeaderFieldId from '../utilities/displayInnerHeaderFieldId';
import isInnerHeaderFieldId from '../utilities/isInnerHeaderFieldId';
import joinWithConjunction from '../utilities/joinWithConjunction';
import deserializeBinaryValue from './fields/deserializeBinaryValue';
import deserializeEndOfHeaderValue from './fields/deserializeEndOfHeaderValue';
import deserializeStreamCipherIdValue from './fields/deserializeStreamCipherIdValue';
import deserializeStreamKeyValue from './fields/deserializeStreamKeyValue';

export default function readInnerHeaderFields(
  buffer: BufferReader,
): KdbxInnerHeader {
  const header: Partial<KdbxInnerHeader> = {};

  for (;;) {
    const fieldId = readInnerHeaderFieldId(buffer);
    const fieldData = readInnerHeaderFieldData(buffer, fieldId);

    switch (fieldId) {
      case InnerHeaderFieldId.InnerStreamMode:
        header.streamCipherId = deserializeStreamCipherIdValue(fieldData);

        // If we got the key first, reprocess it to check the length now that we have the ID
        if (header.streamKey) {
          header.streamKey = deserializeStreamKeyValue(
            fieldData,
            header.streamCipherId,
          );
        }
        break;

      case InnerHeaderFieldId.InnerStreamKey:
        header.streamKey = deserializeStreamKeyValue(
          fieldData,
          header.streamCipherId,
        );
        break;

      case InnerHeaderFieldId.Binary: {
        const binaryValue = deserializeBinaryValue(fieldData);

        if (!header.binaryPool) {
          header.binaryPool = [];
        }

        const nextPoolIndex = `${Object.keys(header.binaryPool).length}`;

        header.binaryPool.push({
          data: binaryValue.data,
          index: nextPoolIndex,
          protectInMemory: binaryValue.protectInMemory,
        });
        break;
      }

      case InnerHeaderFieldId.EndOfHeader:
        header.endOfHeader = deserializeEndOfHeaderValue(fieldData);
        return validateInnerHeader(header);
    }
  }
}

function validateInnerHeader(
  header: Partial<KdbxInnerHeader>,
): KdbxInnerHeader {
  const missingFields: InnerHeaderFieldId[] = [];

  function validateHeaderComplete(
    header: Partial<KdbxInnerHeader>,
  ): header is KdbxInnerHeader {
    missingFields.length = 0;

    if (header.streamCipherId === undefined) {
      missingFields.push(InnerHeaderFieldId.InnerStreamMode);
    }

    if (header.streamKey === undefined) {
      missingFields.push(InnerHeaderFieldId.InnerStreamKey);
    }

    if (header.endOfHeader === undefined) {
      missingFields.push(InnerHeaderFieldId.EndOfHeader);
    }

    return missingFields.length === 0;
  }

  if (!validateHeaderComplete(header)) {
    const fieldLabel = missingFields.length === 1 ? 'field' : 'fields';
    const missingLabels = missingFields.map(
      (v) => `"${displayInnerHeaderFieldId(v)}"`,
    );
    throw new Error(
      `Missing required inner header ${fieldLabel}: ${joinWithConjunction(missingLabels, 'and')}`,
    );
  }

  return {
    binaryPool: header.binaryPool,
    endOfHeader: header.endOfHeader,
    streamCipherId: header.streamCipherId,
    streamKey: header.streamKey,
  };
}

function readInnerHeaderFieldId(reader: BufferReader): InnerHeaderFieldId {
  const fieldId = reader.readUInt8();
  if (!isInnerHeaderFieldId(fieldId)) {
    throw new Error(`Unknown inner header field ID encountered "${fieldId}"`);
  }

  return fieldId;
}

function readInnerHeaderFieldData(
  reader: BufferReader,
  fieldId: InnerHeaderFieldId,
): Uint8Array {
  const fieldLength = reader.readUInt32LE();

  if (!fieldLength && fieldId !== InnerHeaderFieldId.EndOfHeader) {
    throw new Error(
      `Unexpected empty inner header field length for "${displayInnerHeaderFieldId(fieldId)}"`,
    );
  }

  return reader.readBytes(fieldLength);
}
