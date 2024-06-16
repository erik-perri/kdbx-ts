import HeaderFieldId from '../enums/HeaderFieldId';
import { type KdbxHeader, type KdbxSignature } from '../header/types';
import { KeePass2 } from '../header/versions';
import BufferWriter from '../utilities/BufferWriter';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import serializeKdfParameters from './serializeKdfParameters';
import serializeVariantMap from './serializeVariantMap';

export default function serializeHeader(
  signature: KdbxSignature,
  header: KdbxHeader,
  masterSeed: Uint8Array,
  encryptionIV: Uint8Array,
): Uint8Array {
  const writer = new BufferWriter();

  writer.writeUInt32LE(KeePass2.signature1);
  writer.writeUInt32LE(KeePass2.signature2);
  writer.writeUInt32LE(signature.formatVersion); // KdbxVersion.Version4X?

  writeHeaderField(
    writer,
    HeaderFieldId.CipherID,
    Uint8ArrayHelper.fromUuid(header.cipherId),
  );

  writeHeaderField(
    writer,
    HeaderFieldId.CompressionFlags,
    Uint8ArrayHelper.fromUInt32LE(header.compressionAlgorithm),
  );

  writeHeaderField(writer, HeaderFieldId.MasterSeed, masterSeed);

  writeHeaderField(writer, HeaderFieldId.EncryptionIV, encryptionIV);

  const kdfVariantMap = serializeKdfParameters(header.kdfParameters);
  const serializedKdf = serializeVariantMap(kdfVariantMap);

  writeHeaderField(writer, HeaderFieldId.KdfParameters, serializedKdf);

  if (header.publicCustomData !== undefined) {
    throw new Error('Public custom data is not implemented');
  }

  writeHeaderField(
    writer,
    HeaderFieldId.EndOfHeader,
    Uint8ArrayHelper.fromString('\r\n\r\n'),
  );

  return writer.toUint8Array();
}

function writeHeaderField(
  writer: BufferWriter,
  id: HeaderFieldId,
  data: Uint8Array,
): number {
  writer.writeInt8(id);
  writer.writeUInt32LE(data.byteLength);
  return writer.writeBytes(data);
}
