export default class Uint8ArrayWriter {
  private readonly bytes: Uint8Array;

  constructor(bytes: Uint8Array | number) {
    this.bytes = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  }

  static fromString(data: string): Uint8Array {
    const length = data.length;
    const result = new Uint8Array(length);
    for (let index = 0; index < length; index++) {
      result[index] = data.charCodeAt(index);
    }
    return result;
  }

  static fromUInt64LE(data: bigint): Uint8Array {
    const writer = new Uint8ArrayWriter(new Uint8Array(8));
    writer.writeUInt64LE(data, 0);
    return writer.slice();
  }

  static leftJustify(
    data: Uint8Array,
    size: number,
    fillValue: number = 0,
  ): Uint8Array {
    if (data.byteLength < size) {
      const newData = [
        ...data,
        ...new Uint8Array(size - data.byteLength).fill(fillValue),
      ];
      data = Uint8Array.from(newData);
    }

    return data;
  }

  slice(start?: number, end?: number): Uint8Array {
    return this.bytes.slice(start, end);
  }

  writeUInt64BE(value: bigint, offset: number): number {
    const loAsBigInt = value & BigInt(0xffffffff);
    if (
      loAsBigInt < Number.MIN_SAFE_INTEGER ||
      loAsBigInt > Number.MAX_SAFE_INTEGER
    ) {
      throw new RangeError('Lo value is out of bounds');
    }

    let lo = Number(loAsBigInt);
    this.bytes[offset + 7] = lo;
    lo = lo >> 8;
    this.bytes[offset + 6] = lo;
    lo = lo >> 8;
    this.bytes[offset + 5] = lo;
    lo = lo >> 8;
    this.bytes[offset + 4] = lo;

    const hiAsBigInt = (value >> BigInt(32)) & BigInt(0xffffffff);
    if (
      hiAsBigInt < Number.MIN_SAFE_INTEGER ||
      hiAsBigInt > Number.MAX_SAFE_INTEGER
    ) {
      throw new RangeError('Hi value is out of bounds');
    }

    let hi = Number(hiAsBigInt);
    this.bytes[offset + 3] = hi;
    hi = hi >> 8;
    this.bytes[offset + 2] = hi;
    hi = hi >> 8;
    this.bytes[offset + 1] = hi;
    hi = hi >> 8;
    this.bytes[offset] = hi;

    return offset + 8;
  }

  writeUInt64LE(value: bigint, offset: number): number {
    const loAsBigInt = value & BigInt(0xffffffff);
    if (
      loAsBigInt < Number.MIN_SAFE_INTEGER ||
      loAsBigInt > Number.MAX_SAFE_INTEGER
    ) {
      throw new RangeError('Lo value is out of bounds');
    }

    let lo = Number(loAsBigInt);
    this.bytes[offset++] = lo;
    lo = lo >> 8;
    this.bytes[offset++] = lo;
    lo = lo >> 8;
    this.bytes[offset++] = lo;
    lo = lo >> 8;
    this.bytes[offset++] = lo;

    const hiAsBigInt = (value >> BigInt(32)) & BigInt(0xffffffff);
    if (
      hiAsBigInt < Number.MIN_SAFE_INTEGER ||
      hiAsBigInt > Number.MAX_SAFE_INTEGER
    ) {
      throw new RangeError('Hi value is out of bounds');
    }

    let hi = Number(hiAsBigInt);
    this.bytes[offset++] = hi;
    hi = hi >> 8;
    this.bytes[offset++] = hi;
    hi = hi >> 8;
    this.bytes[offset++] = hi;
    hi = hi >> 8;
    this.bytes[offset++] = hi;

    return offset + 8;
  }
}
