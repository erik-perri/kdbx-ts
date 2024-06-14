import transformCompositeKey from '../crypto/transformCompositeKey';
import type { CryptoImplementation } from '../crypto/types';
import HashAlgorithm from '../enums/HashAlgorithm';
import KdbxVersion from '../enums/KdbxVersion';
import type { KdbxHeader, KdbxSignature } from '../header/types';
import { type KdbxKey } from '../keys/types';
import type { KdbxConfiguration } from '../readKdbxFile';
import displayHash from '../utilities/displayHash';
import type Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import Uint8ArrayReader from '../utilities/Uint8ArrayReader';
import Uint8ArrayWriter from '../utilities/Uint8ArrayWriter';
import parseHeader from './parseHeader';

export type KdbxDatabase4 = {
  signature: KdbxSignature;
  header: KdbxHeader;
};

async function keepassHmacKey(
  crypto: CryptoImplementation,
  masterSeed: Uint8Array,
  transformedMasterKey: Uint8Array,
): Promise<Uint8Array> {
  return await crypto.hash(HashAlgorithm.Sha512, [
    masterSeed,
    transformedMasterKey,
    Uint8Array.from([0x01]),
  ]);
}

async function getBlockHmacKey(
  crypto: CryptoImplementation,
  blockIndex: bigint,
  key: Uint8Array,
): Promise<Uint8Array> {
  if (key.byteLength !== 64) {
    throw new Error(
      'Unexpected key length. Expected 64 bytes, got ${key.byteLength}',
    );
  }

  return crypto.hash(HashAlgorithm.Sha512, [
    Uint8ArrayWriter.fromUInt64LE(blockIndex),
    key,
  ]);
}

const UINT64_MAX = BigInt('18446744073709551615'); // 0xffffffffffffffff

export default async function parseDatabase(
  { crypto }: KdbxConfiguration,
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

  const hmacKey = await keepassHmacKey(crypto, header.masterSeed, compositeKey);

  const headerHmac = await crypto.hmac(
    HashAlgorithm.Sha256,
    await getBlockHmacKey(crypto, UINT64_MAX, hmacKey),
    [headerData],
  );

  if (!Uint8ArrayReader.equals(expectedHeaderHmac, headerHmac)) {
    throw new Error('HMAC mismatch');
  }

  return Promise.resolve({
    signature,
    header,
  });
}
