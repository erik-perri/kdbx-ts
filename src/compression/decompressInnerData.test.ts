import { describe, expect, it } from 'vitest';

import CompressionAlgorithm from '../enums/CompressionAlgorithm';
import decompressInnerData from './decompressInnerData';

describe('decompressInnerData', () => {
  it.each([
    [
      'none',
      {
        algorithm: CompressionAlgorithm.None,
        data: Uint8Array.from([0x06, 0x05, 0x04, 0x03, 0x02, 0x01]),
        expected: Uint8Array.from([0x06, 0x05, 0x04, 0x03, 0x02, 0x01]),
      },
    ],
    [
      'gzip',
      {
        algorithm: CompressionAlgorithm.GZip,
        data: Uint8Array.from([
          0x1f, 0x8b, 0x8, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x3, 0x63, 0x64, 0x62,
          0x66, 0x64, 0x62, 0x6, 0x0, 0x87, 0xd7, 0x16, 0xb8, 0x6, 0x0, 0x0,
          0x0,
        ]),
        expected: Uint8Array.from([0x01, 0x02, 0x03, 0x01, 0x02, 0x03]),
      },
    ],
  ])(
    'should decompress data using the algorithm %s',
    (_, { algorithm, data, expected }) => {
      // Arrange
      // Nothing to arrange.

      // Act
      const result = decompressInnerData(algorithm, data);

      // Assert
      expect(result).toEqual(expected);
    },
  );
});
