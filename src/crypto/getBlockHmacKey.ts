import HashAlgorithm from '../enums/HashAlgorithm';
import Uint8ArrayWriter from '../utilities/Uint8ArrayWriter';
import type { CryptoImplementation } from './types';

export default async function getBlockHmacKey(
  crypto: CryptoImplementation,
  blockIndex: bigint | number | null,
  key: Uint8Array,
): Promise<Uint8Array> {
  if (key.byteLength !== 64) {
    throw new Error(
      `Unexpected key length. Expected 64 bytes, got ${key.byteLength}`,
    );
  }

  if (blockIndex === null) {
    blockIndex = BigInt('18446744073709551615'); // 0xffffffffffffffff (UINT64_MAX)
  }

  return crypto.hash(HashAlgorithm.Sha512, [
    Uint8ArrayWriter.fromUInt64LE(blockIndex),
    key,
  ]);
}
