import { describe, expect, it } from 'vitest';

import { sampleDatabaseCases } from '../../fixtures/databases';
import Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import parseHeader from './parseHeader';

describe('parseHeader', () => {
  it.each(sampleDatabaseCases)(
    `parses kdbx header %s`,
    (
      _,
      {
        expectedCipher,
        expectedCompressionAlgorithm,
        expectedIvLength,
        expectedKdfParameters,
        file,
      },
    ) => {
      // Arrange
      const reader = new Uint8ArrayCursorReader(file);

      // Skip the signature and version fields.
      reader.offset = 0xc;

      // Act
      const header = parseHeader(reader);

      // Assert
      expect(header.cipherId).toEqual(expectedCipher);
      expect(header.compressionAlgorithm).toEqual(expectedCompressionAlgorithm);
      expect(header.masterSeed).toHaveLength(32);
      expect(header.encryptionIV).toHaveLength(expectedIvLength);
      expect(header.kdfParameters).toEqual(expectedKdfParameters);
    },
  );
});
