import HeaderFieldId from '../enums/HeaderFieldId';
import type { KdbxHeader, KdbxHeaderField } from '../header/types';
import validateCipherId from '../header/validateCipherId';
import validateCompressionFlags from '../header/validateCompressionFlags';
import validateMasterSeed from '../header/validateMasterSeed';
import type BufferReader from '../utilities/BufferReader';
import displayKdbxHeaderFieldId from '../utilities/displayKdbxHeaderFieldId';
import { isKdbxHeaderFieldId } from '../utilities/isKdbxHeaderFieldId';
import parseKdfParameters from './parseKdfParameters';
import parseVariantMap from './parseVariantMap';

export default function readHeader(reader: BufferReader): KdbxHeader {
  const header: Partial<KdbxHeader> = {};

  for (;;) {
    const field = readKdbxHeaderField(reader);

    if (field.id === HeaderFieldId.EndOfHeader) {
      break;
    }

    switch (field.id) {
      case HeaderFieldId.Comment:
        break;

      case HeaderFieldId.CipherID: {
        const [cipherId, cipherMode] = validateCipherId(field.data);

        header.cipherId = cipherId;
        header.cipherMode = cipherMode;
        break;
      }

      case HeaderFieldId.CompressionFlags:
        header.compressionAlgorithm = validateCompressionFlags(field.data);
        break;

      case HeaderFieldId.MasterSeed:
        header.masterSeed = validateMasterSeed(field.data);
        break;

      case HeaderFieldId.EncryptionIV:
        header.encryptionIV = field.data;
        break;

      case HeaderFieldId.KdfParameters:
        header.kdfParameters = parseKdfParameters(parseVariantMap(field.data));
        break;

      case HeaderFieldId.PublicCustomData:
        throw new Error('Public custom data is not implemented');

      case HeaderFieldId.ProtectedStreamKey:
      case HeaderFieldId.TransformRounds:
      case HeaderFieldId.TransformSeed:
      case HeaderFieldId.StreamStartBytes:
      case HeaderFieldId.InnerRandomStreamID:
        throw new Error(
          `Legacy field encountered in KDBX4 file: ${displayKdbxHeaderFieldId(field.id)}`,
        );
    }
  }

  if (!isHeaderComplete(header)) {
    throw new Error('Incomplete header data');
  }

  return header;
}

function readKdbxHeaderField(reader: BufferReader): KdbxHeaderField {
  const fieldId = reader.readInt8();
  if (!isKdbxHeaderFieldId(fieldId)) {
    throw new Error(`Unknown header field ID encountered "${fieldId}"`);
  }

  const fieldLabel = displayKdbxHeaderFieldId(fieldId);
  const fieldLength = reader.readUInt32LE();

  if (!fieldLength) {
    throw new Error(`Unknown header field length for ${fieldLabel}`);
  }

  let fieldData: Uint8Array = new Uint8Array(0);
  if (fieldLength) {
    fieldData = reader.readBytes(fieldLength);
    if (fieldData.byteLength !== fieldLength) {
      throw new Error(
        `Invalid header data length for ${fieldLabel}. Expected ${fieldLength} bytes, got ${fieldData.byteLength}`,
      );
    }
  }

  return {
    id: fieldId,
    data: fieldData,
  };
}

function isHeaderComplete(header: Partial<KdbxHeader>): header is KdbxHeader {
  return (
    header.cipherId !== undefined &&
    header.cipherMode !== undefined &&
    header.compressionAlgorithm !== undefined &&
    header.encryptionIV !== undefined &&
    header.kdfParameters !== undefined &&
    header.masterSeed !== undefined
  );
}
