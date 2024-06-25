import type { KdbxBinaryPoolValue } from '../../types/format';
import BufferWriter from '../../utilities/BufferWriter';

export default function serializeBinaryValue(
  value: KdbxBinaryPoolValue,
): Uint8Array {
  const writer = new BufferWriter();

  writer.writeUInt8(value.protectInMemory ? 0x01 : 0x00);
  writer.writeBytes(value.data);

  return writer.toUint8Array();
}
