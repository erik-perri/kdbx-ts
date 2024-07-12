import HeaderFieldId from '../enums/HeaderFieldId';
import { type KdbxOuterHeaderFields } from '../types/format';
import BufferWriter from '../utilities/BufferWriter';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import serializeCipherAlgorithmValue from './fields/serializeCipherAlgorithmValue';
import serializeCompressionAlgorithmValue from './fields/serializeCompressionAlgorithmValue';
import serializeEncryptionIvValue from './fields/serializeEncryptionIvValue';
import serializeEndOfHeaderValue from './fields/serializeEndOfHeaderValue';
import serializeKdfParametersValue from './fields/serializeKdfParametersValue';
import serializeMasterSeedValue from './fields/serializeMasterSeedValue';
import serializeVariantMapValue from './fields/serializeVariantMapValue';

export default function serializeHeaderFields(
  header: KdbxOuterHeaderFields,
): Uint8Array {
  const writer = new BufferWriter();

  const fieldsToWrite = [
    {
      id: HeaderFieldId.CipherAlgorithm,
      data: serializeCipherAlgorithmValue(header.cipherAlgorithm),
    },
    {
      id: HeaderFieldId.CompressionAlgorithm,
      data: serializeCompressionAlgorithmValue(header.compressionAlgorithm),
    },
    {
      id: HeaderFieldId.MasterSeed,
      data: serializeMasterSeedValue(header.masterSeed),
    },
    {
      id: HeaderFieldId.EncryptionIV,
      data: serializeEncryptionIvValue(header.encryptionIV),
    },
    {
      id: HeaderFieldId.KdfParameters,
      data: serializeKdfParametersValue(header.kdfParameters),
    },
    {
      id: HeaderFieldId.PublicCustomData,
      data: header.publicCustomData
        ? serializeVariantMapValue(header.publicCustomData)
        : undefined,
    },
    {
      id: HeaderFieldId.EndOfHeader,
      data:
        header.endOfHeader !== undefined
          ? serializeEndOfHeaderValue(header.endOfHeader)
          : Uint8ArrayHelper.fromString('\r\n\r\n'),
    },
  ];

  for (const { data, id } of fieldsToWrite) {
    if (data === undefined) {
      continue;
    }

    writer.writeUInt8(id);
    writer.writeUInt32LE(data.byteLength);
    writer.writeBytes(data);
  }

  return writer.toUint8Array();
}
