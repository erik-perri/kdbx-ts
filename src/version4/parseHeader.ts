import HeaderFieldId from '../enums/HeaderFieldId';
import isHeaderComplete from '../header/isHeaderComplete';
import type { KdbxHeader, KdbxHeaderField } from '../header/types';
import validateCipherId from '../header/validateCipherId';
import validateCompressionFlags from '../header/validateCompressionFlags';
import validateMasterSeed from '../header/validateMasterSeed';
import displayKdbxHeaderFieldId from '../utilities/displayKdbxHeaderFieldId';
import { isKdbxHeaderFieldId } from '../utilities/isKdbxHeaderFieldId';
import type Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import parseVariantMap from './parseVariantMap';
import processKdfParameters from './processKdfParameters';

function readKdbxHeaderField(reader: Uint8ArrayCursorReader): KdbxHeaderField {
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

export default function parseHeader(
  reader: Uint8ArrayCursorReader,
): KdbxHeader {
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
        header.kdfParameters = processKdfParameters(
          parseVariantMap(field.data),
        );
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
