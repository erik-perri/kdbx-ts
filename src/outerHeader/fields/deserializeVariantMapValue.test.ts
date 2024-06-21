import { describe, expect, it } from 'vitest';

import Argon2Version from '../../enums/Argon2Version';
import KdfUuid from '../../enums/KdfUuid';
import VariantMapFieldType from '../../enums/VariantMapFieldType';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import { KeePass2 } from '../../versions';
import deserializeVariantMapValue from './deserializeVariantMapValue';

describe('deserializeVariantMapValue', () => {
  it('reads fields until the end', () => {
    // Arrange
    const data = Uint8Array.from(
      Buffer.concat([
        Uint8ArrayHelper.fromUInt16LE(KeePass2.variantMapVersion),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.ByteArray),
        Uint8ArrayHelper.fromUInt32LE(5),
        Uint8ArrayHelper.fromString('$UUID'),
        Uint8ArrayHelper.fromUInt32LE(16),
        Uint8ArrayHelper.fromUuid(KdfUuid.Argon2d),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.Int32),
        Uint8ArrayHelper.fromUInt32LE(1),
        Uint8ArrayHelper.fromString('V'),
        Uint8ArrayHelper.fromUInt32LE(4),
        Uint8ArrayHelper.fromUInt32LE(Argon2Version.V13),

        Uint8ArrayHelper.fromUInt8(VariantMapFieldType.End),
      ]),
    );

    // Act
    const result = deserializeVariantMapValue(data);

    // Assert
    expect(result).toEqual({
      values: {
        $UUID: {
          type: VariantMapFieldType.ByteArray,
          value: Uint8ArrayHelper.fromUuid(KdfUuid.Argon2d),
        },
        V: {
          type: VariantMapFieldType.Int32,
          value: Argon2Version.V13,
        },
      },
      version: 0x100,
    });
  });
});
