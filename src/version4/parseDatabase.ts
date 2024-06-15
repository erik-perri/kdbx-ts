import pako from 'pako';

import createSymmetricCipher from '../crypto/createSymmetricCipher';
import getBlockHmacKey from '../crypto/getBlockHmacKey';
import getKeepassHmacKey from '../crypto/getKeepassHmacKey';
import transformCompositeKey from '../crypto/transformCompositeKey';
import type { CryptoImplementation } from '../crypto/types';
import CompressionAlgorithm from '../enums/CompressionAlgorithm';
import HashAlgorithm from '../enums/HashAlgorithm';
import KdbxVersion from '../enums/KdbxVersion';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import type { KdbxSignature } from '../header/types';
import { type KdbxKey } from '../keys/types';
import displayHash from '../utilities/displayHash';
import Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import Uint8ArrayReader from '../utilities/Uint8ArrayReader';
import parseHeader from './parseHeader';
import readHmacHashedBlocks from './readHmacHashedBlocks';
import readInnerHeaderFields from './readInnerHeaderFields';
import { type KdbxDatabase4 } from './types';
import parseDatabaseXml from './xml/parseDatabaseXml';

export default async function parseDatabase(
  crypto: CryptoImplementation,
  keys: KdbxKey[],
  reader: Uint8ArrayCursorReader,
  signature: KdbxSignature,
): Promise<KdbxDatabase4> {
  const header = parseHeader(reader);

  // Store the header data to compare with the checksum later
  const headerData = reader.processed();

  const FILE_VERSION_CRITICAL_MASK = 0xffff0000;
  const fileVersion = signature.formatVersion & FILE_VERSION_CRITICAL_MASK;
  if (fileVersion !== KdbxVersion.Version40) {
    throw new Error(
      `Unexpected file version. Expected 0x${KdbxVersion.Version40.toString(16)}, got 0x${fileVersion.toString(16)}`,
    );
  }

  const compositeKey = await transformCompositeKey(crypto, header, keys);

  const expectedHeaderHash = reader.readBytes(32);
  if (expectedHeaderHash.byteLength !== 32) {
    throw new Error(
      `Unexpected header hash length. Expected 32 bytes, got ${expectedHeaderHash.byteLength} bytes`,
    );
  }

  const headerHash = await crypto.hash(HashAlgorithm.Sha256, [headerData]);
  if (!Uint8ArrayReader.equals(expectedHeaderHash, headerHash)) {
    throw new Error(
      `Header data hash mismatch. Expected "${displayHash(expectedHeaderHash)}", got "${displayHash(headerHash)}"`,
    );
  }

  const expectedHeaderHmac = reader.readBytes(32);
  if (expectedHeaderHmac.byteLength !== 32) {
    throw new Error(
      `Unexpected header HMAC length. Expected 32 bytes, got ${expectedHeaderHmac.byteLength} bytes`,
    );
  }

  const hmacKey = await getKeepassHmacKey(
    crypto,
    header.masterSeed,
    compositeKey,
  );

  const headerHmac = await crypto.hmac(
    HashAlgorithm.Sha256,
    await getBlockHmacKey(crypto, null, hmacKey),
    [headerData],
  );

  if (!Uint8ArrayReader.equals(expectedHeaderHmac, headerHmac)) {
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

  const processedBytes: Uint8Array = await cipher.finish(
    blocks.reduce(
      (previous, current) => Uint8Array.from([...previous, ...current]),
      new Uint8Array(0),
    ),
  );

  const buffer =
    header.compressionAlgorithm === CompressionAlgorithm.GZip
      ? pako.inflate(processedBytes)
      : processedBytes;

  const bufferReader = new Uint8ArrayCursorReader(buffer);

  const innerHeaders = readInnerHeaderFields(bufferReader);

  const randomStreamCipher = await createSymmetricCipher(
    crypto,
    innerHeaders.innerRandomStreamMode,
    innerHeaders.innerRandomStreamKey,
  );

  const database = await parseDatabaseXml(
    bufferReader.slice(),
    innerHeaders.binaryPool,
    randomStreamCipher,
  );

  return {
    database,
    header,
    innerHeaders,
    signature,
  };
}
