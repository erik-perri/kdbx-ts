import serializeHmacHashedBlocks from './blocks/serializeHmacHashedBlocks';
import compressInnerData from './compression/compressInnerData';
import createInnerStreamCipher from './crypto/createInnerStreamCipher';
import cryptInnerData from './crypto/cryptInnerData';
import generateBlockHmacKey from './crypto/generateBlockHmacKey';
import generateHmacKeySeed from './crypto/generateHmacKeySeed';
import processHash from './crypto/processHash';
import processHmac from './crypto/processHmac';
import transformCompositeKey from './crypto/transformCompositeKey';
import HashAlgorithm from './enums/HashAlgorithm';
import SymmetricCipherDirection from './enums/SymmetricCipherDirection';
import serializeInnerHeaderFields from './innerHeader/serializeInnerHeaderFields';
import serializeHeaderFields from './outerHeader/serializeHeaderFields';
import serializeSignature from './outerHeader/serializeSignature';
import { type KdbxFile } from './types/format';
import { type KdbxKey } from './types/keys';
import Uint8ArrayHelper from './utilities/Uint8ArrayHelper';
import serializeDatabaseXml from './xml/serializeDatabaseXml';

export type KdbxWriteResult = {
  bytes: Uint8Array;
  compositeKey: Uint8Array;
};

export default async function writeKdbxFile(
  keys: KdbxKey[],
  file: KdbxFile,
): Promise<KdbxWriteResult> {
  const signature = serializeSignature(file.outerHeader.signature);

  const compositeKey = await transformCompositeKey(
    file.outerHeader.fields.kdfParameters,
    keys,
  );

  const outerHeader = serializeHeaderFields(file.outerHeader.fields);

  const outerHeaderHash = await processHash(HashAlgorithm.Sha256, [
    signature,
    outerHeader,
  ]);

  const outerHeaderHmacKey = await generateHmacKeySeed(
    file.outerHeader.fields.masterSeed,
    compositeKey,
  );

  const outerHeaderHmac = await processHmac(
    HashAlgorithm.Sha256,
    await generateBlockHmacKey(null, outerHeaderHmacKey),
    [signature, outerHeader],
  );

  const innerHeader = serializeInnerHeaderFields(file.innerHeader);

  const streamCipher = await createInnerStreamCipher(
    file.innerHeader.innerEncryptionAlgorithm,
    file.innerHeader.innerEncryptionKey,
  );

  const databaseXml = await serializeDatabaseXml(
    file.database,
    file.innerHeader.binaryPool,
    streamCipher,
  );

  const innerData = Buffer.concat([
    innerHeader,
    Uint8ArrayHelper.fromString(databaseXml),
  ]);

  const compressedData = compressInnerData(
    file.outerHeader.fields.compressionAlgorithm,
    innerData,
  );

  const encryptedData = await cryptInnerData(
    SymmetricCipherDirection.Encrypt,
    file.outerHeader.fields.cipherAlgorithm,
    file.outerHeader.fields.masterSeed,
    file.outerHeader.fields.encryptionIV,
    compositeKey,
    compressedData,
  );

  const blocks = await serializeHmacHashedBlocks(
    encryptedData,
    outerHeaderHmacKey,
  );

  const bytes = Uint8Array.from(
    Buffer.concat([
      signature,
      outerHeader,
      outerHeaderHash,
      outerHeaderHmac,
      blocks,
    ]),
  );

  return {
    bytes,
    compositeKey,
  };
}
