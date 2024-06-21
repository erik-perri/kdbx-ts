import { type KdbxBinaryPoolValue } from '../../types';
import BufferReader from '../../utilities/BufferReader';

type KdbxBinaryPoolValueWithoutIndex = Omit<KdbxBinaryPoolValue, 'index'>;

export default function deserializeBinaryValue(
  data: Uint8Array,
): KdbxBinaryPoolValueWithoutIndex {
  if (data.byteLength < 1) {
    throw new Error(
      `Invalid binary value length. Expected at least 1 byte, got ${data.byteLength}`,
    );
  }

  const reader = new BufferReader(data);
  const protectInMemoryFlag = reader.readUInt8();

  if (protectInMemoryFlag !== 0x00 && protectInMemoryFlag !== 0x01) {
    throw new Error(
      `Unexpected protect in memory binary flag. Expected 0x00 or 0x01, got 0x${protectInMemoryFlag.toString(16)}`,
    );
  }

  return {
    data: reader.remaining(),
    protectInMemory: protectInMemoryFlag === 0x01,
  };
}
