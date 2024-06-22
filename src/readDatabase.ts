import readHmacHashedBlocks from './blocks/readHmacHashedBlocks';
import decompressInnerData from './compression/decompressInnerData';
import createInnerStreamCipher from './crypto/createInnerStreamCipher';
import cryptInnerData from './crypto/cryptInnerData';
import generateBlockHmacKey from './crypto/generateBlockHmacKey';
import generateHmacKeySeed from './crypto/generateHmacKeySeed';
import transformCompositeKey from './crypto/transformCompositeKey';
import { type CryptoImplementation } from './crypto/types';
import HashAlgorithm from './enums/HashAlgorithm';
import KeePassVersion from './enums/KeePassVersion';
import SymmetricCipherDirection from './enums/SymmetricCipherDirection';
import readInnerHeaderFields from './innerHeader/readInnerHeaderFields';
import type { KdbxKey } from './keys/types';
import readHeaderFields from './outerHeader/readHeaderFields';
import readHeaderHashes from './outerHeader/readHeaderHashes';
import readSignature from './outerHeader/readSignature';
import { type KdbxFile } from './types';
import BufferReader from './utilities/BufferReader';
import displayHash from './utilities/displayHash';
import Uint8ArrayHelper from './utilities/Uint8ArrayHelper';
import { findVersionFromSignature } from './versions';
import readDatabaseXml from './xml/readDatabaseXml';

export default async function readDatabase(
  crypto: CryptoImplementation,
  keys: KdbxKey[],
  fileBytes: Buffer | Uint8Array | number[],
): Promise<KdbxFile> {
  const reader = new BufferReader(fileBytes);

  // Verify the version
  const signature = readSignature(reader);
  const appVersion = findVersionFromSignature(
    signature.signature1,
    signature.signature2,
  );

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
  const headerHashes = readHeaderHashes(reader);

  // Verify the header hash to check the integrity of the header
  const headerHash = await crypto.hash(HashAlgorithm.Sha256, [headerData]);

  if (!Uint8ArrayHelper.areEqual(headerHashes.hash, headerHash)) {
    throw new Error(
      `Invalid header hash. Expected "${displayHash(headerHashes.hash)}", got "${displayHash(headerHash)}"`,
    );
  }

  // Transform the composite key using the KDF parameters
  const compositeKey = await transformCompositeKey(
    crypto,
    header.kdfParameters,
    keys,
  );

  // Verify the HMAC hash to check the authenticity of the header and key(s)
  const hmacKey = await generateHmacKeySeed(
    crypto,
    header.masterSeed,
    compositeKey,
  );

  const headerHmacHash = await crypto.hmac(
    HashAlgorithm.Sha256,
    await generateBlockHmacKey(crypto, null, hmacKey),
    [headerData],
  );

  if (!Uint8ArrayHelper.areEqual(headerHashes.hmacHash, headerHmacHash)) {
    throw new Error('HMAC mismatch');
  }

  const innerData = await readHmacHashedBlocks(crypto, reader, hmacKey);

  const decryptedData = await cryptInnerData(
    crypto,
    header,
    compositeKey,
    SymmetricCipherDirection.Decrypt,
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
    crypto,
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
