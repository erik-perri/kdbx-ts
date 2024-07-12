import HashAlgorithm from '../enums/HashAlgorithm';
import type { KdbxCompositeKey } from '../types/keys';
import processHash from './processHash';

export default async function generateHmacKeySeed(
  masterSeed: Uint8Array,
  compositeKey: KdbxCompositeKey,
): Promise<Uint8Array> {
  return await processHash(HashAlgorithm.Sha512, [
    masterSeed,
    compositeKey,
    Uint8Array.from([0x01]),
  ]);
}
