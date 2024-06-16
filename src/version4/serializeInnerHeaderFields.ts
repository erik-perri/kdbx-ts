import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';
import ProtectedStreamAlgorithm from '../enums/ProtectedStreamAlgorithm';
import BufferWriter from '../utilities/BufferWriter';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import { type KdbxDatabase4 } from './types';

export default function serializeInnerHeaderFields(
  _database: KdbxDatabase4,
  protectedStreamKey: Uint8Array,
): Uint8Array {
  const innerWriter = new BufferWriter();

  writeInnerHeaderField(
    innerWriter,
    InnerHeaderFieldId.InnerStreamMode,
    Uint8ArrayHelper.fromInt32LE(ProtectedStreamAlgorithm.ChaCha20),
  );

  writeInnerHeaderField(
    innerWriter,
    InnerHeaderFieldId.InnerStreamKey,
    protectedStreamKey,
  );

  // TODO Find all attachments and write binary pool

  writeInnerHeaderField(innerWriter, InnerHeaderFieldId.End, new Uint8Array(0));

  return innerWriter.toUint8Array();
}

function writeInnerHeaderField(
  writer: BufferWriter,
  id: InnerHeaderFieldId,
  data: Uint8Array,
): number {
  writer.writeInt8(id);
  writer.writeUInt32LE(data.byteLength);
  return writer.writeBytes(data);
}
