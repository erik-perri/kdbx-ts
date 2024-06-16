import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from './Uint8ArrayHelper';

describe('Uint8ArrayHelper', () => {
  describe('to*', () => {
    it.each([
      {
        bytes: Uint8Array.from([0x00, 0x00, 0x00, 0x00]),
        expected: 0,
      },
      {
        bytes: Uint8Array.from([0xff, 0xff, 0xff, 0xff]),
        expected: -1,
      },
      {
        bytes: Uint8Array.from([0x01, 0x01, 0x01, 0x01]),
        expected: 16843009,
      },
    ])('toInt32LE %s', ({ bytes, expected }) => {
      // Arrange
      // Nothing to arrange.

      // Act
      const result = Uint8ArrayHelper.toInt32LE(bytes);

      // Assert
      expect(result).toEqual(expected);
    });

    it.each([
      {
        bytes: Uint8Array.from([0x00, 0x00, 0x00, 0x00]),
        expected: 0,
      },
      {
        bytes: Uint8Array.from([0xff, 0xff, 0xff, 0xff]),
        expected: 4294967295,
      },
      {
        bytes: Uint8Array.from([0x01, 0x01, 0x01, 0x01]),
        expected: 16843009,
      },
    ])('toUInt32LE %s', ({ bytes, expected }) => {
      // Arrange
      // Nothing to arrange.

      // Act
      const result = Uint8ArrayHelper.toUInt32LE(bytes);

      // Assert
      expect(result).toEqual(expected);
    });

    it.each([
      {
        bytes: Uint8Array.from([
          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        ]),
        expected: BigInt(0),
      },
      {
        bytes: Uint8Array.from([
          0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        ]),
        expected: BigInt(-1),
      },
      {
        bytes: Uint8Array.from([
          0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
        ]),
        expected: BigInt('72340172838076673'),
      },
    ])('toInt64LE %s', ({ bytes, expected }) => {
      // Arrange
      // Nothing to arrange.

      // Act
      const result = Uint8ArrayHelper.toInt64LE(bytes);

      // Assert
      expect(result).toEqual(expected);
    });

    it.each([
      {
        bytes: Uint8Array.from([
          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        ]),
        expected: BigInt(0),
      },
      {
        bytes: Uint8Array.from([
          0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        ]),
        expected: BigInt('18446744073709551615'),
      },
      {
        bytes: Uint8Array.from([
          0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
        ]),
        expected: BigInt('72340172838076673'),
      },
    ])('toUInt64LE %s', ({ bytes, expected }) => {
      // Arrange
      // Nothing to arrange.

      // Act
      const result = Uint8ArrayHelper.toUInt64LE(bytes);

      // Assert
      expect(result).toEqual(expected);
    });

    it.each([
      [
        'empty',
        {
          bytes: Uint8Array.from([]),
          expected: '',
        },
      ],
      [
        'utf8',
        {
          bytes: Uint8Array.from([0xf0, 0x9f, 0x98, 0xb0]),
          expected: '😰',
        },
      ],
      [
        'string',
        {
          bytes: Uint8Array.from([0x54, 0x65, 0x73, 0x74]),
          expected: 'Test',
        },
      ],
    ])('toString %s', (_, { bytes, expected }) => {
      // Arrange
      // Nothing to arrange.

      // Act
      const result = Uint8ArrayHelper.toString(bytes);

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('areEqual', () => {
    it.each([
      {
        a: Uint8Array.from([]),
        b: Uint8Array.from([]),
        expected: true,
      },
      {
        a: Uint8Array.from([0x00]),
        b: Uint8Array.from([0x00]),
        expected: true,
      },
      {
        a: Uint8Array.from([0x00]),
        b: Uint8Array.from([0x00, 0x00]),
        expected: false,
      },
      {
        a: Uint8Array.from([0x00, 0x01]),
        b: Uint8Array.from([0x00, 0x00]),
        expected: false,
      },
    ])('compares correctly %s', ({ a, b, expected }) => {
      // Arrange
      // Nothing to arrange.

      // Act
      const result = Uint8ArrayHelper.areEqual(a, b);

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('leftJustify', () => {
    it.each([
      [
        'return the original array if its length is greater than or equal to the desired size',
        {
          data: new Uint8Array([1, 2, 3, 4, 5]),
          size: 5,
          fillValue: 0,
          expected: new Uint8Array([1, 2, 3, 4, 5]),
        },
      ],
      [
        'pad the array with the fill value if its length is less than the desired size',
        {
          data: new Uint8Array([1, 2, 3]),
          size: 5,
          fillValue: 0,
          expected: new Uint8Array([1, 2, 3, 0, 0]),
        },
      ],
      [
        'use the default fill value of 0 if none is provided',
        {
          data: new Uint8Array([1, 2, 3]),
          size: 5,
          fillValue: undefined,
          expected: new Uint8Array([1, 2, 3, 0, 0]),
        },
      ],
      [
        'use the provided fill value if it is specified',
        {
          data: new Uint8Array([1, 2, 3]),
          size: 5,
          fillValue: 42,
          expected: new Uint8Array([1, 2, 3, 42, 42]),
        },
      ],
      [
        'handle an empty input array',
        {
          data: new Uint8Array([]),
          size: 3,
          fillValue: 42,
          expected: new Uint8Array([42, 42, 42]),
        },
      ],
    ])('should %s', (_, { data, size, fillValue, expected }) => {
      // Arrange
      // Nothing to arrange.

      // Act
      const result = Uint8ArrayHelper.leftJustify(data, size, fillValue);

      // Assert
      expect(result).toEqual(expected);
      expect(result).not.toBe(data); // Check that a new array is returned
    });
  });
});
