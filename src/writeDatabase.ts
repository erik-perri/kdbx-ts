import serializeHmacHashedBlocks from './blocks/serializeHmacHashedBlocks';
import compressInnerData from './compression/compressInnerData';
import createInnerStreamCipher from './crypto/createInnerStreamCipher';
import cryptInnerData from './crypto/cryptInnerData';
import generateBlockHmacKey from './crypto/generateBlockHmacKey';
import generateHmacKeySeed from './crypto/generateHmacKeySeed';
import transformCompositeKey from './crypto/transformCompositeKey';
import { type CryptoImplementation } from './crypto/types';
import HashAlgorithm from './enums/HashAlgorithm';
import SymmetricCipherDirection from './enums/SymmetricCipherDirection';
import serializeInnerHeaderFields from './innerHeader/serializeInnerHeaderFields';
import { type KdbxKey } from './keys/types';
import serializeHeaderFields from './outerHeader/serializeHeaderFields';
import serializeSignature from './outerHeader/serializeSignature';
import { type KdbxFile } from './types';
import Uint8ArrayHelper from './utilities/Uint8ArrayHelper';
import serializeDatabaseXml from './xml/serializeDatabaseXml';

export default async function writeDatabase(
  crypto: CryptoImplementation,
  keys: KdbxKey[],
  file: KdbxFile,
): Promise<Uint8Array> {
  const signature = serializeSignature(file.signature);

  const compositeKey = await transformCompositeKey(
    crypto,
    file.header.kdfParameters,
    keys,
  );

  const outerHeader = serializeHeaderFields(file.header);

  const outerHeaderHash = await crypto.hash(HashAlgorithm.Sha256, [
    signature,
    outerHeader,
  ]);

  const outerHeaderHmacKey = await generateHmacKeySeed(
    crypto,
    file.header.masterSeed,
    compositeKey,
  );

  const outerHeaderHmac = await crypto.hmac(
    HashAlgorithm.Sha256,
    await generateBlockHmacKey(crypto, null, outerHeaderHmacKey),
    [signature, outerHeader],
  );

  const innerHeader = serializeInnerHeaderFields(file.innerHeader);

  const streamCipher = await createInnerStreamCipher(
    crypto,
    file.innerHeader.innerEncryptionAlgorithm,
    file.innerHeader.innerEncryptionKey,
  );

  const xml = await serializeDatabaseXml(
    file.database,
    file.innerHeader.binaryPool,
    streamCipher,
  );

  const innerData = Buffer.concat([
    innerHeader,
    Uint8ArrayHelper.fromString(xml),
  ]);

  const compressedData = compressInnerData(
    file.header.compressionAlgorithm,
    innerData,
  );

  const encryptedData = await cryptInnerData(
    crypto,
    file.header,
    compositeKey,
    SymmetricCipherDirection.Encrypt,
    compressedData,
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
