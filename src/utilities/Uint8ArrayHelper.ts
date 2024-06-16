const encoder = new TextEncoder();
const decoder = new TextDecoder();

const Uint8ArrayHelper = {
  areEqual(a: Uint8Array, b: Uint8Array): boolean {
    if (a.byteLength !== b.byteLength) {
      return false;
    }

    for (let index = 0; index < a.byteLength; index++) {
      if (a[index] !== b[index]) {
        return false;
      }
    }

    return true;
  },
  fromBase64(data: string): Uint8Array {
    return Uint8Array.from(
      Uint8Array.prototype.slice.call(Buffer.from(data, 'base64')),
    );
  },
  fromInt8(data: number): Uint8Array {
    return new Uint8Array([data]);
  },
  fromInt32LE(data: number): Uint8Array {
    const buffer = Buffer.allocUnsafe(4);

    buffer.writeInt32LE(data, 0);

    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromInt64LE(data: bigint): Uint8Array {
    const buffer = Buffer.allocUnsafe(8);

    buffer.writeBigInt64LE(data, 0);

    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromString(data: string): Uint8Array {
    return encoder.encode(data);
  },
  fromUInt32LE(data: number): Uint8Array {
    const buffer = Buffer.allocUnsafe(4);

    buffer.writeUInt32LE(data, 0);

    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromUInt64LE(data: bigint | number): Uint8Array {
    const buffer = Buffer.allocUnsafe(8);

    buffer.writeBigUInt64LE(BigInt(data), 0);

    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  leftJustify(
    data: Uint8Array,
    size: number,
    fillValue: number = 0,
  ): Uint8Array {
    if (data.byteLength >= size) {
      return Uint8Array.from(data);
    }

    const paddedData = new Uint8Array(size);
    paddedData.set(data);
    paddedData.fill(fillValue, data.byteLength);
    return paddedData;
  },
  toInt32LE(bytes: Uint8Array): number {
    const buffer = Buffer.from(bytes);

    return buffer.readInt32LE(0);
  },
  toInt64LE(bytes: Uint8Array): bigint {
    const buffer = Buffer.from(bytes);

    return buffer.readBigInt64LE(0);
  },
  toString(bytes: Uint8Array): string {
    return decoder.decode(bytes);
  },
  toUInt32LE(bytes: Uint8Array): number {
    const buffer = Buffer.from(bytes);

    return buffer.readUInt32LE(0);
  },
  toUInt64LE(bytes: Uint8Array): bigint {
    const buffer = Buffer.from(bytes);

    return buffer.readBigUInt64LE(0);
  },
};

export default Uint8ArrayHelper;
