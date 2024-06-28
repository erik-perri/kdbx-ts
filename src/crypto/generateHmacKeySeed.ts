import HashAlgorithm from '../enums/HashAlgorithm';
import processHash from './processHash';

export default async function generateHmacKeySeed(
  masterSeed: Uint8Array,
  transformedMasterKey: Uint8Array,
): Promise<Uint8Array> {
  return await processHash(HashAlgorithm.Sha512, [
    masterSeed,
    transformedMasterKey,
    Uint8Array.from([0x01]),
  ]);
}
