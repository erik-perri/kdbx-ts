import pako from 'pako';

import getBlockHmacKey from '../crypto/getBlockHmacKey';
import getHmacKeySeed from '../crypto/getHmacKeySeed';
import transformCompositeKey from '../crypto/transformCompositeKey';
import type { CryptoImplementation } from '../crypto/types';
import CompressionAlgorithm from '../enums/CompressionAlgorithm';
import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import type { KdbxKey } from '../keys/types';
import getSymmetricCipherDefaultIvSize from '../utilities/getSymmetricCipherDefaultIvSize';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import serializeHeader from './serializeHeader';
import serializeHmacHashedBlocks from './serializeHmacHashedBlocks';
import serializeInnerHeaderFields from './serializeInnerHeaderFields';
import type { KdbxDatabase4 } from './types';

export default async function writeDatabase(
  crypto: CryptoImplementation,
  database: KdbxDatabase4,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  const ivSize = getSymmetricCipherDefaultIvSize(database.header.cipherMode);

  const masterSeed = await crypto.randomBytes(32);
  const encryptionIV = await crypto.randomBytes(ivSize);
  const protectedStreamKey = await crypto.randomBytes(64);

  // TODO Clone database instead of modifying
  database.header.kdfParameters.seed = await crypto.randomBytes(
    database.header.kdfParameters.seed.byteLength,
  );

  const compositeKey = await transformCompositeKey(
    crypto,
    database.header,
    keys,
  );

  const finalKey = await crypto.hash(HashAlgorithm.Sha256, [
    masterSeed,
    compositeKey,
  ]);

  const headerData = serializeHeader(
    database.signature,
    database.header,
    masterSeed,
    encryptionIV,
  );

  const headerHash = await crypto.hash(HashAlgorithm.Sha256, [headerData]);

  const hmacKey = await getHmacKeySeed(crypto, masterSeed, compositeKey);

  const headerHmac = await crypto.hmac(
    HashAlgorithm.Sha256,
    await getBlockHmacKey(crypto, null, hmacKey),
    [headerData],
  );

  const innerHeaderFields = serializeInnerHeaderFields(
    database,
    protectedStreamKey,
  );

  // TODO Generate XML
  const xml = '<?xml version="1.0"?><KeePassFile />';

  const cipher = await crypto.createCipher(
    database.header.cipherMode,
    SymmetricCipherDirection.Encrypt,
    finalKey,
    encryptionIV,
  );

  const innerData = Buffer.concat([
    innerHeaderFields,
    Uint8ArrayHelper.fromString(xml),
  ]);

  const encryptedData = await cipher.finish(
    database.header.compressionAlgorithm === CompressionAlgorithm.GZip
      ? pako.deflate(innerData)
      : innerData,
  );

  const blocks = await serializeHmacHashedBlocks(
    crypto,
    encryptedData,
    hmacKey,
  );

  return Uint8Array.from(
    Buffer.concat([headerData, headerHash, headerHmac, blocks]),
  );
}
