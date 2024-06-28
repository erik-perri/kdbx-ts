import { getDependency } from '../dependencies';
import type HashAlgorithm from '../enums/HashAlgorithm';

export default async function processHmac(
  algorithm: HashAlgorithm,
  key: Uint8Array,
  data: Uint8Array[],
): Promise<Uint8Array> {
  const hash = await getDependency('hmac')(algorithm, key);

  data.forEach((datum) => hash.update(datum));

  return Uint8Array.from(hash.digest());
}
