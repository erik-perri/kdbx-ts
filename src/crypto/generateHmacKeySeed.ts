import HashAlgorithm from '../enums/HashAlgorithm';
import { type CryptoImplementation } from '../types/crypto';

export default async function generateHmacKeySeed(
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
