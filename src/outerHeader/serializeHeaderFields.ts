import HeaderFieldId from '../enums/HeaderFieldId';
import { type KdbxOuterHeader } from '../types';
import BufferWriter from '../utilities/BufferWriter';
import serializeCipherIdValue from './fields/serializeCipherIdValue';
import serializeCompressionAlgorithmValue from './fields/serializeCompressionAlgorithmValue';
import serializeEncryptionIvValue from './fields/serializeEncryptionIvValue';
import serializeEndOfHeaderValue from './fields/serializeEndOfHeaderValue';
import serializeKdfParametersValue from './fields/serializeKdfParametersValue';
import serializeMasterSeedValue from './fields/serializeMasterSeedValue';
import serializeVariantMapValue from './fields/serializeVariantMapValue';

export default function serializeHeaderFields(
  header: KdbxOuterHeader,
): Uint8Array {
  const writer = new BufferWriter();

  const fieldsToWrite = [
    {
      id: HeaderFieldId.CipherID,
      data: serializeCipherIdValue(header.cipherId),
    },
    {
      id: HeaderFieldId.CompressionFlags,
      data: serializeCompressionAlgorithmValue(header.compressionFlags),
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
      data: serializeEndOfHeaderValue(header.endOfHeader),
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
