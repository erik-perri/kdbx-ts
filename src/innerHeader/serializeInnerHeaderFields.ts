import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import { type KdbxInnerHeader } from '../types';
import BufferWriter from '../utilities/BufferWriter';
import serializeBinaryValue from './fields/serializeBinaryValue';
import serializeEndOfHeaderValue from './fields/serializeEndOfHeaderValue';
import serializeStreamCipherIdValue from './fields/serializeStreamCipherIdValue';
import serializeStreamKeyValue from './fields/serializeStreamKeyValue';

export default function serializeInnerHeaderFields(
  header: KdbxInnerHeader,
): Uint8Array {
  const writer = new BufferWriter();

  const binaryPool = header.binaryPool ?? [];

  const fields = [
    {
      id: InnerHeaderFieldId.InnerStreamMode,
      data: serializeStreamCipherIdValue(header.streamCipherId),
    },
    {
      id: InnerHeaderFieldId.InnerStreamKey,
      data: serializeStreamKeyValue(header.streamKey, header.streamCipherId),
    },
    ...binaryPool.map((value) => ({
      id: InnerHeaderFieldId.Binary,
      data: serializeBinaryValue(value),
    })),
    {
      id: InnerHeaderFieldId.EndOfHeader,
      data: serializeEndOfHeaderValue(header.endOfHeader),
    },
  ];

  for (const field of fields) {
    writer.writeUInt8(field.id);
    writer.writeUInt32LE(field.data.byteLength);
    writer.writeBytes(field.data);
  }

  return writer.toUint8Array();
}
