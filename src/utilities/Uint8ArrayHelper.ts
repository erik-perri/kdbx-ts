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
  fromUInt8(data: number): Uint8Array {
    const buffer = Buffer.allocUnsafe(1);

    buffer.writeUInt8(data, 0);

    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
  },
  fromUInt16LE(data: number): Uint8Array {
    const buffer = Buffer.allocUnsafe(2);

    buffer.writeUInt16LE(data, 0);

    return Uint8Array.from(Uint8Array.prototype.slice.call(buffer));
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
  /**
   * Converts a UUID string to an RFC4122-compliant byte array.
   * TODO Restructure the options to allow for empty UUIDs to match compliance
   */
  fromUuid(data: string, ensureCompliance: boolean = true): Uint8Array {
    const match = data.replace(/-/g, '').match(/.{2}/g);

    if (!match) {
      throw new Error(`Invalid UUID "${data}"`);
    }

    if (match.length !== 16) {
      throw new Error(
        `Unexpected UUID length. Expected 36 bytes, got ${data.length}`,
      );
    }

    const hexArray = match.map((hex) => parseInt(hex, 16));

    if (hexArray.some(Number.isNaN)) {
      throw new Error(`Invalid UUID "${data}"`);
    }

    if (ensureCompliance) {
      // Check for version (4 bits at index 6)
      const version = (hexArray[6] & 0xf0) >> 4;
      if (version !== 4) {
        throw new Error(`Unexpected UUID version. Expected 4, got ${version}`);
      }

      // Check for variant (2 bits at index 8)
      const variant = (hexArray[8] & 0xc0) >> 6;
      if (variant !== 2) {
        throw new Error(`Unexpected UUID variant. Expected 2, got ${variant}`);
      }
    }

    return Uint8Array.from(hexArray);
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
