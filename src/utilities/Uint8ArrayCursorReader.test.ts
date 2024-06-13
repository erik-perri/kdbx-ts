import type { ArgumentsType } from 'vitest';
import { describe, expect, it } from 'vitest';

import Uint8ArrayCursorReader from './Uint8ArrayCursorReader';

describe('Uint8ArrayCursorReader', () => {
  describe('read*', () => {
    type TestCase = {
      offset: number;
      expected: number;
      method: keyof Uint8ArrayCursorReader;
      args?: ArgumentsType<
        Uint8ArrayCursorReader[keyof Uint8ArrayCursorReader]
      >;
    };

    const cases = [
      // Bytes
      {
        offset: 0,
        expected: 8,
        method: 'readBytes',
        args: [8],
      },
      {
        offset: 8,
        expected: 10,
        method: 'readBytes',
        args: [2],
      },

      // 8
      {
        offset: 0,
        expected: 1,
        method: 'readInt8',
        args: [],
      },

      // 16
      {
        offset: 0,
        expected: 2,
        method: 'readUInt16LE',
        args: [],
      },

      // 16
      {
        offset: 0,
        expected: 4,
        method: 'readUInt32LE',
        args: [],
      },
    ] as const satisfies TestCase[];

    it.each(cases)(
      'moves the cursor forward %s',
      ({ args, method, offset, expected }) => {
        // Arrange
        const buffer = Array.from({ length: 10 }, () => 0x20);
        const reader = new Uint8ArrayCursorReader(buffer, offset);

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
      const buffer = Array.from({ length: 20 }, () => 0x20);
      const expected = Uint8Array.from(buffer.slice(0, 9));
      const reader = new Uint8ArrayCursorReader(buffer, 8);

      // Act
      reader.readInt8();
      const result = reader.processed();

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
