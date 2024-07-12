import HeaderFieldId from '../enums/HeaderFieldId';
import { type KdbxOuterHeaderFields } from '../types/format';
import type BufferReader from '../utilities/BufferReader';
import displayHeaderFieldId from '../utilities/displayHeaderFieldId';
import { isHeaderFieldId } from '../utilities/isHeaderFieldId';
import joinWithConjunction from '../utilities/joinWithConjunction';
import deserializeCipherAlgorithmValue from './fields/deserializeCipherAlgorithmValue';
import deserializeCompressionAlgorithmValue from './fields/deserializeCompressionAlgorithmValue';
import deserializeEncryptionIvValue from './fields/deserializeEncryptionIvValue';
import deserializeEndOfHeaderValue from './fields/deserializeEndOfHeaderValue';
import deserializeKdfParametersValue from './fields/deserializeKdfParametersValue';
import deserializeMasterSeedValue from './fields/deserializeMasterSeedValue';
import deserializeVariantMapValue from './fields/deserializeVariantMapValue';

export default function readHeaderFields(
  buffer: BufferReader,
): KdbxOuterHeaderFields {
  const header: Partial<KdbxOuterHeaderFields> = {};

  for (;;) {
    const fieldId = readOuterHeaderFieldId(buffer);
    const fieldData = readOuterHeaderFieldData(buffer, fieldId);

    switch (fieldId) {
      case HeaderFieldId.Comment:
      case HeaderFieldId.TransformSeed:
      case HeaderFieldId.TransformRounds:
      case HeaderFieldId.ProtectedStreamKey:
      case HeaderFieldId.StreamStartBytes:
      case HeaderFieldId.InnerRandomStreamID:
        throw new Error(
          `Unsupported header field ID encountered "${displayHeaderFieldId(fieldId)}" with ${buffer.byteLength} bytes of data`,
        );

      case HeaderFieldId.CipherAlgorithm:
        header.cipherAlgorithm = deserializeCipherAlgorithmValue(fieldData);
        break;

      case HeaderFieldId.CompressionAlgorithm:
        header.compressionAlgorithm =
          deserializeCompressionAlgorithmValue(fieldData);
        break;

      case HeaderFieldId.MasterSeed:
        header.masterSeed = deserializeMasterSeedValue(fieldData);
        break;

      case HeaderFieldId.EncryptionIV:
        header.encryptionIV = deserializeEncryptionIvValue(fieldData);
        break;

      case HeaderFieldId.KdfParameters:
        header.kdfParameters = deserializeKdfParametersValue(fieldData);
        break;

      case HeaderFieldId.PublicCustomData:
        header.publicCustomData = deserializeVariantMapValue(fieldData);
        break;

      case HeaderFieldId.EndOfHeader:
        header.endOfHeader = deserializeEndOfHeaderValue(fieldData);
        return validateOuterHeader(header);
    }
  }
}

function validateOuterHeader(
  header: Partial<KdbxOuterHeaderFields>,
): KdbxOuterHeaderFields {
  const missingFields: HeaderFieldId[] = [];

  function validateHeaderComplete(
    header: Partial<KdbxOuterHeaderFields>,
  ): header is KdbxOuterHeaderFields {
    missingFields.length = 0;

    if (header.cipherAlgorithm === undefined) {
      missingFields.push(HeaderFieldId.CipherAlgorithm);
    }

    if (header.compressionAlgorithm === undefined) {
      missingFields.push(HeaderFieldId.CompressionAlgorithm);
    }

    if (header.masterSeed === undefined) {
      missingFields.push(HeaderFieldId.MasterSeed);
    }

    if (header.encryptionIV === undefined) {
      missingFields.push(HeaderFieldId.EncryptionIV);
    }

    if (header.kdfParameters === undefined) {
      missingFields.push(HeaderFieldId.KdfParameters);
    }

    return missingFields.length === 0;
  }

  if (!validateHeaderComplete(header)) {
    const fieldLabel = missingFields.length === 1 ? 'field' : 'fields';
    const missingLabels = missingFields.map(
      (v) => `"${displayHeaderFieldId(v)}"`,
    );
    throw new Error(
      `Missing required header ${fieldLabel}: ${joinWithConjunction(missingLabels, 'and')}`,
    );
  }

  return {
    cipherAlgorithm: header.cipherAlgorithm,
    compressionAlgorithm: header.compressionAlgorithm,
    encryptionIV: header.encryptionIV,
    endOfHeader: header.endOfHeader,
    kdfParameters: header.kdfParameters,
    masterSeed: header.masterSeed,
    publicCustomData: header.publicCustomData,
  };
}

function readOuterHeaderFieldId(reader: BufferReader): HeaderFieldId {
  const fieldId = reader.readUInt8();

  if (!isHeaderFieldId(fieldId)) {
    throw new Error(`Unknown header field ID encountered "${fieldId}"`);
  }

  return fieldId;
}

function readOuterHeaderFieldData(
  reader: BufferReader,
  fieldId: HeaderFieldId,
): Uint8Array {
  const fieldLength = reader.readUInt32LE();

  if (!fieldLength) {
    throw new Error(
      `Unexpected empty header field length for ${displayHeaderFieldId(fieldId)}`,
    );
  }

  return reader.readBytes(fieldLength);
}
