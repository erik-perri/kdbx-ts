import HashAlgorithm from '../enums/HashAlgorithm';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import type { CryptoImplementation } from './types';

export default async function getBlockHmacKey(
  crypto: CryptoImplementation,
  blockIndex: bigint | number | null,
  key: Uint8Array,
): Promise<Uint8Array> {
  if (key.byteLength !== 64) {
    throw new Error(
      `Invalid key length. Expected 64 bytes, got ${key.byteLength}`,
    );
  }

  if (blockIndex === null) {
    blockIndex = BigInt('0xffffffffffffffff'); // UINT64_MAX
  }

  return crypto.hash(HashAlgorithm.Sha512, [
    Uint8ArrayHelper.fromUInt64LE(blockIndex),
    key,
  ]);
}
