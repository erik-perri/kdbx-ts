export default class BufferReader {
  private readonly buffer: Buffer;
  private cursor: number = 0;

  constructor(input: Buffer | Uint8Array | number[]) {
    this.buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  }

  get offset(): number {
    return this.cursor;
  }

  readBytes(length: number): Uint8Array {
    this.assertRemaining(length);

    const bytes = Uint8Array.prototype.slice.call(
      this.buffer,
      this.offset,
      this.offset + length,
    );

    this.cursor += length;

    return Uint8Array.from(bytes);
  }

  readInt8(): number {
    this.assertRemaining(1);

    const result = this.buffer.readInt8(this.offset);

    this.cursor += 1;

    return result;
  }

  readUInt16LE(): number {
    this.assertRemaining(2);

    const result = this.buffer.readUInt16LE(this.offset);

    this.cursor += 2;

    return result;
  }

  readUInt32LE(): number {
    this.assertRemaining(4);

    const result = this.buffer.readUInt32LE(this.offset);

    this.cursor += 4;

    return result;
  }

  processed(): Uint8Array {
    return Uint8Array.from(
      Uint8Array.prototype.slice.call(this.buffer, 0, this.offset),
    );
  }

  remaining(): Uint8Array {
    return Uint8Array.from(
      Uint8Array.prototype.slice.call(this.buffer, this.offset),
    );
  }

  private assertRemaining(length: number): void {
    if (this.offset + length > this.buffer.length) {
      throw new Error('Unexpected end of file');
    }
  }
}
