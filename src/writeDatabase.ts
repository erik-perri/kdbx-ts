import pako from 'pako';

import serializeHmacHashedBlocks from './blocks/serializeHmacHashedBlocks';
import generateBlockHmacKey from './crypto/generateBlockHmacKey';
import generateHmacKeySeed from './crypto/generateHmacKeySeed';
import transformCompositeKey from './crypto/transformCompositeKey';
import { type CryptoImplementation } from './crypto/types';
import CompressionAlgorithm from './enums/CompressionAlgorithm';
import HashAlgorithm from './enums/HashAlgorithm';
import SymmetricCipherDirection from './enums/SymmetricCipherDirection';
import serializeInnerHeaderFields from './innerHeader/serializeInnerHeaderFields';
import { type KdbxKey } from './keys/types';
import serializeHeaderFields from './outerHeader/serializeHeaderFields';
import serializeSignature from './outerHeader/serializeSignature';
import { type KdbxFile } from './types';
import getSymmetricCipherDefaultIvSize from './utilities/getSymmetricCipherDefaultIvSize';
import Uint8ArrayHelper from './utilities/Uint8ArrayHelper';

export default async function writeDatabase(
  crypto: CryptoImplementation,
  file: KdbxFile,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  const signature = serializeSignature(file.signature);

  const ivSize = getSymmetricCipherDefaultIvSize(file.header.cipherId);

  const masterSeed = await crypto.randomBytes(32);
  const encryptionIV = await crypto.randomBytes(ivSize);
  const protectedStreamKey = await crypto.randomBytes(64);

  // TODO Clone database instead of modifying
  file.header.encryptionIV = encryptionIV;
  file.header.kdfParameters.seed = await crypto.randomBytes(
    file.header.kdfParameters.seed.byteLength,
  );
  file.header.masterSeed = masterSeed;
  file.innerHeader.streamKey = protectedStreamKey;

  const compositeKey = await transformCompositeKey(
    crypto,
    file.header.kdfParameters,
    keys,
  );

  const finalKey = await crypto.hash(HashAlgorithm.Sha256, [
    masterSeed,
    compositeKey,
  ]);

  const outerHeader = serializeHeaderFields(file.header);

  const outerHeaderHash = await crypto.hash(HashAlgorithm.Sha256, [
    outerHeader,
  ]);
  const outerHeaderHmacKey = await generateHmacKeySeed(
    crypto,
    masterSeed,
    compositeKey,
  );

  const outerHeaderHmac = await crypto.hmac(
    HashAlgorithm.Sha256,
    await generateBlockHmacKey(crypto, null, outerHeaderHmacKey),
    [outerHeader],
  );

  const innerHeader = serializeInnerHeaderFields(file.innerHeader);

  // TODO Generate XML
  const xml =
    '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n' +
    '<KeePassFile>';

  const cipher = await crypto.createCipher(
    file.header.cipherId,
    SymmetricCipherDirection.Encrypt,
    finalKey,
    encryptionIV,
  );

  const innerData = Buffer.concat([
    innerHeader,
    Uint8ArrayHelper.fromString(xml),
  ]);

  const encryptedData = await cipher.finish(
    file.header.compressionFlags === CompressionAlgorithm.GZip
      ? pako.gzip(innerData)
      : innerData,
  );

  const blocks = await serializeHmacHashedBlocks(
    crypto,
    encryptedData,
    outerHeaderHmacKey,
  );

  return Uint8Array.from(
    Buffer.concat([
      signature,
      outerHeader,
      outerHeaderHash,
      outerHeaderHmac,
      blocks,
    ]),
  );
}
