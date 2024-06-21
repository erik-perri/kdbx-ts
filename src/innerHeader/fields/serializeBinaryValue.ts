import type { KdbxBinaryPoolValue } from '../../types';
import BufferWriter from '../../utilities/BufferWriter';

export default function serializeBinaryValue(
  mode: KdbxBinaryPoolValue,
): Uint8Array {
  const writer = new BufferWriter();

  writer.writeUInt8(mode.protectInMemory ? 0x01 : 0x00);
  writer.writeBytes(mode.data);

  return writer.toUint8Array();
}
