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
import KeePassVersion from './enums/KeePassVersion';
import SymmetricCipherDirection from './enums/SymmetricCipherDirection';
import readInnerHeaderFields from './innerHeader/readInnerHeaderFields';
import readHeaderFields from './outerHeader/readHeaderFields';
import readSignature from './outerHeader/readSignature';
import { type KdbxFile } from './types/format';
import { type KdbxKey } from './types/keys';
import BufferReader from './utilities/BufferReader';
import displayHash from './utilities/displayHash';
import getVersionFromSignature from './utilities/getVersionFromSignature';
import Uint8ArrayHelper from './utilities/Uint8ArrayHelper';
import readDatabaseXml from './xml/readDatabaseXml';

export default async function readDatabase(
  keys: KdbxKey[],
  fileBytes: Buffer | Uint8Array | number[],
): Promise<KdbxFile> {
  const reader = new BufferReader(fileBytes);

  // Verify the version
  const signature = readSignature(reader);
  const appVersion = getVersionFromSignature(signature);

  switch (appVersion) {
    case KeePassVersion.KeePass1:
      throw new Error('KeePass1 databases are not supported');
    case KeePassVersion.KeePass2:
      break;
    default:
      throw new Error('Unknown database format');
  }

  switch (signature.versionMajor) {
    case 2:
      throw new Error('KeePass2 v2.x databases are not supported');
    case 3:
      throw new Error('KeePass2 v3.x databases are not supported');
    case 4:
      break;
    default:
      throw new Error(
        `Unknown database version "${signature.versionMajor}.${signature.versionMinor}"`,
      );
  }

  // Read the outer header
  const header = readHeaderFields(reader);
  const headerData = reader.processed();

  // Read the expected header hashes
  const expectedHeaderHash = reader.readBytes(32);
  const expectedHeaderHmacHash = reader.readBytes(32);

  // Verify the header processHash to check the integrity of the header
  const headerHash = await processHash(HashAlgorithm.Sha256, [headerData]);

  if (!Uint8ArrayHelper.areEqual(expectedHeaderHash, headerHash)) {
    throw new Error(
      `Invalid header hash. Expected "${displayHash(expectedHeaderHash)}", got "${displayHash(headerHash)}"`,
    );
  }

  // Transform the composite key using the KDF parameters
  const compositeKey = await transformCompositeKey(header.kdfParameters, keys);

  // Verify the HMAC processHash to check the authenticity of the header and key(s)
  const hmacKey = await generateHmacKeySeed(header.masterSeed, compositeKey);

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
    header.cipherAlgorithm,
    header.masterSeed,
    header.encryptionIV,
    compositeKey,
    innerData,
  );

  const decompressedData = decompressInnerData(
    header.compressionAlgorithm,
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

  return { signature, header, innerHeader, database };
}
