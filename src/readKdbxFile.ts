import readHmacHashedBlocks from './blocks/readHmacHashedBlocks';
import decompressInnerData from './compression/decompressInnerData';
import createInnerStreamCipher from './crypto/createInnerStreamCipher';
import cryptInnerData from './crypto/cryptInnerData';
import generateBlockHmacKey from './crypto/generateBlockHmacKey';
import generateHmacKeySeed from './crypto/generateHmacKeySeed';
import processHash from './crypto/processHash';
import processHmac from './crypto/processHmac';
import transformCompositeKey from './crypto/transformCompositeKey';
import HashAlgorithm from './enums/HashAlgorithm';
import SymmetricCipherDirection from './enums/SymmetricCipherDirection';
import readInnerHeaderFields from './innerHeader/readInnerHeaderFields';
import parseKdbxHeader from './parseKdbxHeader';
import { type KdbxFile } from './types/format';
import { type KdbxCompositeKey, type KdbxKey } from './types/keys';
import BufferReader from './utilities/BufferReader';
import displayHash from './utilities/displayHash';
import Uint8ArrayHelper from './utilities/Uint8ArrayHelper';
import readDatabaseXml from './xml/readDatabaseXml';

type ReadKdbxFile = KdbxFile & { compositeKey: Uint8Array };

export default async function readKdbxFile(
  keys: KdbxKey[] | KdbxCompositeKey,
  fileBytes: Buffer | Uint8Array | number[],
): Promise<ReadKdbxFile> {
  const outerHeader = parseKdbxHeader(fileBytes);

  const reader = new BufferReader(fileBytes);
  const headerData = reader.readBytes(outerHeader.size);

  // Read the expected header hashes
  const expectedHeaderHash = reader.readBytes(32);
  const expectedHeaderHmacHash = reader.readBytes(32);

  // Verify the header hash to check the integrity of the header
  const headerHash = await processHash(HashAlgorithm.Sha256, [headerData]);

  if (!Uint8ArrayHelper.areEqual(expectedHeaderHash, headerHash)) {
    throw new Error(
      `Invalid header hash. Expected "${displayHash(expectedHeaderHash)}", got "${displayHash(headerHash)}"`,
    );
  }

  // Transform the composite key using the KDF parameters
  const compositeKey = ArrayBuffer.isView(keys)
    ? keys
    : await transformCompositeKey(outerHeader.fields.kdfParameters, keys);

  // Verify the HMAC hash to check the authenticity of the header and key(s)
  const hmacKey = await generateHmacKeySeed(
    outerHeader.fields.masterSeed,
    compositeKey,
  );

  const headerHmacHash = await processHmac(
    HashAlgorithm.Sha256,
    await generateBlockHmacKey(null, hmacKey),
    [headerData],
  );

  if (!Uint8ArrayHelper.areEqual(expectedHeaderHmacHash, headerHmacHash)) {
    throw new Error('HMAC mismatch');
  }

  const innerData = await readHmacHashedBlocks(reader, hmacKey);

  const decryptedData = await cryptInnerData(
    SymmetricCipherDirection.Decrypt,
    outerHeader.fields.cipherAlgorithm,
    outerHeader.fields.masterSeed,
    outerHeader.fields.encryptionIV,
    compositeKey,
    innerData,
  );

  const decompressedData = decompressInnerData(
    outerHeader.fields.compressionAlgorithm,
    decryptedData,
  );

  const innerReader = new BufferReader(decompressedData);

  const innerHeader = readInnerHeaderFields(innerReader);

  const databaseXml = Uint8ArrayHelper.toString(innerReader.remaining());

  const streamCipher = await createInnerStreamCipher(
    innerHeader.innerEncryptionAlgorithm,
    innerHeader.innerEncryptionKey,
  );

  const database = await readDatabaseXml(
    databaseXml,
    innerHeader.binaryPool,
    streamCipher,
  );

  return {
    compositeKey,
    database,
    innerHeader,
    outerHeader,
  };
}
