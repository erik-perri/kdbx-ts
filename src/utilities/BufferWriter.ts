import Uint8ArrayHelper from './Uint8ArrayHelper';

export default class BufferWriter {
  private readonly chunks: Uint8Array[] = [];

  private length = 0;

  public toUint8Array(): Uint8Array {
    const result = new Uint8Array(this.length);
    let offset = 0;

    for (const chunk of this.chunks) {
      result.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return result;
  }

  writeBytes(data: Uint8Array): number {
    this.chunks.push(data);
    this.length += data.byteLength;
    return this.length;
  }

  writeInt32LE(number: number): number {
    return this.writeBytes(Uint8ArrayHelper.fromInt32LE(number));
  }

  writeUInt8(number: number): number {
    return this.writeBytes(Uint8ArrayHelper.fromUInt8(number));
  }

  writeUInt16LE(number: number): number {
    return this.writeBytes(Uint8ArrayHelper.fromUInt16LE(number));
  }

  writeUInt32LE(number: number): number {
    return this.writeBytes(Uint8ArrayHelper.fromUInt32LE(number));
  }
}
