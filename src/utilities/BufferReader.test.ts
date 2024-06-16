import { describe, expect, it } from 'vitest';

import BufferReader from './BufferReader';

describe('BufferReader', () => {
  describe('read*', () => {
    type TestCase = {
      expected: number;
      method: keyof BufferReader;
      args?: unknown[];
    };

    const cases = [
      // Bytes
      {
        expected: 8,
        method: 'readBytes',
        args: [8],
      },

      // 8
      {
        expected: 1,
        method: 'readInt8',
        args: [],
      },

      // 16
      {
        expected: 2,
        method: 'readUInt16LE',
        args: [],
      },

      // 32
      {
        expected: 4,
        method: 'readUInt32LE',
        args: [],
      },
    ] as const satisfies TestCase[];

    it.each(cases)(
      'moves the cursor forward %s',
      ({ args, method, expected }) => {
        // Arrange
        const buffer = Array.from({ length: 10 }, () => 0x20);
        const reader = new BufferReader(buffer);

        // Act
        // @ts-expect-error - This is just for convenience
        reader[method](...args);

        // Assert
        expect(reader.offset).toEqual(expected);
      },
    );
  });

  describe('processed', () => {
    it('returns the processed bytes', () => {
      // Arrange
      const buffer = Array.from({ length: 20 }, (_, index) => index);
      const expected = Uint8Array.from(buffer.slice(0, 9));
      const reader = new BufferReader(buffer);

      // Act
      reader.readInt8();
      reader.readUInt32LE();
      reader.readUInt32LE();
      const result = reader.processed();

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('remaining', () => {
    it('returns the remaining bytes', () => {
      // Arrange
      const buffer = Array.from({ length: 20 }, (_, index) => index);
      const expected = Uint8Array.from(buffer.slice(9));
      const reader = new BufferReader(buffer);

      // Act
      reader.readInt8();
      reader.readUInt32LE();
      reader.readUInt32LE();
      const result = reader.remaining();

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
