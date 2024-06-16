import pako from 'pako';

import createInnerStreamCipher from '../crypto/createInnerStreamCipher';
import getBlockHmacKey from '../crypto/getBlockHmacKey';
import getHmacKeySeed from '../crypto/getHmacKeySeed';
import transformCompositeKey from '../crypto/transformCompositeKey';
import type { CryptoImplementation } from '../crypto/types';
import CompressionAlgorithm from '../enums/CompressionAlgorithm';
import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import type { KdbxSignature } from '../header/types';
import { KeePass2 } from '../header/versions';
import { type KdbxKey } from '../keys/types';
import BufferReader from '../utilities/BufferReader';
import displayHash from '../utilities/displayHash';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import readHeader from './readHeader';
import readHmacHashedBlocks from './readHmacHashedBlocks';
import readInnerHeaderFields from './readInnerHeaderFields';
import { type KdbxDatabase4 } from './types';
import parseDatabaseXml from './xml/parseDatabaseXml';

export default async function readDatabase(
  crypto: CryptoImplementation,
  keys: KdbxKey[],
  reader: BufferReader,
  signature: KdbxSignature,
): Promise<KdbxDatabase4> {
  const fileVersion =
    signature.formatVersion & KeePass2.fileVersionCriticalMask;
  if (fileVersion !== KeePass2.fileVersion40) {
    throw new Error(
      `Invalid file version. Expected 0x${KeePass2.fileVersion40.toString(16)}, got 0x${fileVersion.toString(16)}`,
    );
  }

  const header = readHeader(reader);

  // Save the header data to verify the checksum later.
  const headerData = reader.processed();

  const compositeKey = await transformCompositeKey(crypto, header, keys);

  const expectedHeaderHash = reader.readBytes(32);
  if (expectedHeaderHash.byteLength !== 32) {
    throw new Error(
      `Invalid header hash length. Expected 32 bytes, got ${expectedHeaderHash.byteLength}`,
    );
  }

  const headerHash = await crypto.hash(HashAlgorithm.Sha256, [headerData]);
  if (!Uint8ArrayHelper.areEqual(expectedHeaderHash, headerHash)) {
    throw new Error(
      `Invalid header hash. Expected "${displayHash(expectedHeaderHash)}", got "${displayHash(headerHash)}"`,
    );
  }

  const expectedHeaderHmac = reader.readBytes(32);
  if (expectedHeaderHmac.byteLength !== 32) {
    throw new Error(
      `Invalid header HMAC length. Expected 32 bytes, got ${expectedHeaderHmac.byteLength}`,
    );
  }

  const hmacKey = await getHmacKeySeed(crypto, header.masterSeed, compositeKey);

  const headerHmac = await crypto.hmac(
    HashAlgorithm.Sha256,
    await getBlockHmacKey(crypto, null, hmacKey),
    [headerData],
  );

  if (!Uint8ArrayHelper.areEqual(expectedHeaderHmac, headerHmac)) {
    throw new Error('HMAC mismatch');
  }

  const blocks = await readHmacHashedBlocks(crypto, reader, hmacKey);

  const finalKey = await crypto.hash(HashAlgorithm.Sha256, [
    header.masterSeed,
    compositeKey,
  ]);

  const cipher = await crypto.createCipher(
    header.cipherMode,
    SymmetricCipherDirection.Decrypt,
    finalKey,
    header.encryptionIV,
  );

  const processedBytes = await cipher.finish(
    blocks.reduce(
      (previous, current) => Uint8Array.from([...previous, ...current]),
      new Uint8Array(0),
    ),
  );

  const innerBuffer =
    header.compressionAlgorithm === CompressionAlgorithm.GZip
      ? pako.inflate(processedBytes)
      : processedBytes;

  const innerBufferReader = new BufferReader(innerBuffer);

  const innerHeaders = readInnerHeaderFields(innerBufferReader);

  const innerCipher = await createInnerStreamCipher(
    crypto,
    innerHeaders.innerStreamMode,
    innerHeaders.innerStreamKey,
  );

  const database = await parseDatabaseXml(
    innerBufferReader.remaining(),
    innerHeaders.binaryPool,
    innerCipher,
  );

  return {
    database,
    header,
    innerHeaders,
    signature,
  };
}