import { describe, expect, it } from 'vitest';

import Uint8ArrayHelper from './Uint8ArrayHelper';

describe('Uint8ArrayHelper', () => {
  describe('from*', () => {
    describe('fromUuid', () => {
      it('converts a valid RFC4122 UUID to a byte array', () => {
        // Arrange
        const uuid = '0e60e188-e439-4904-8b69-92d66556e6c8';
        const expected = Uint8Array.from([
          0x0e, 0x60, 0xe1, 0x88, 0xe4, 0x39, 0x49, 0x04, 0x8b, 0x69, 0x92,
          0xd6, 0x65, 0x56, 0xe6, 0xc8,
        ]);

        // Act
        const result = Uint8ArrayHelper.fromUuid(uuid);

        // Assert
        expect(result).toEqual(expected);
      });

      it('converts an invalid RFC4122 UUID to a byte array if wanted', () => {
        // Arrange
        const uuid = 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
        const expected = Uint8Array.from([
          0xf8, 0x1d, 0x4f, 0xae, 0x7d, 0xec, 0x11, 0xd0, 0xa7, 0x65, 0x00,
          0xa0, 0xc9, 0x1e, 0x6b, 0xf6,
        ]);

        // Act
        const result = Uint8ArrayHelper.fromUuid(uuid, false);

        // Assert
        expect(result).toEqual(expected);
      });

      it.each([
        [
          'invalid length',
          {
            uuid: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf',
            expected: 'Unexpected UUID length. Expected 36 bytes, got 35',
          },
        ],
        [
          'invalid hex',
          {
            uuid: 'f81d4fae-7dec-11d0-a765-00a0c91e6bg6',
            expected: 'Invalid UUID "f81d4fae-7dec-11d0-a765-00a0c91e6bg6"',
          },
        ],
        [
          'invalid version',
          {
            uuid: 'f81d4fae-7dec-01d0-a765-00a0c91e6bf6',
            expected: 'Unexpected UUID version. Expected 4, got 0',
          },
        ],
        [
          'invalid variant',
          {
            uuid: 'aa4aaa2c-c6ca-45f5-00b6-0b5c78ee2cb7',
            expected: 'Unexpected UUID variant. Expected 2, got 0',
          },
        ],
      ])('throws an error for %s', (_, { uuid, expected }) => {
        // Arrange
        // Nothing to arrange.

        // Act
        expect(() => Uint8ArrayHelper.fromUuid(uuid)).toThrowError(expected);

        // Assert
        // Nothing to assert.
      });
    });
  });
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
