import { getDependency } from '../dependencies';
import type HashAlgorithm from '../enums/HashAlgorithm';

export default async function processHash(
  algorithm: HashAlgorithm,
  data: Uint8Array[],
): Promise<Uint8Array> {
  const hash = await getDependency('hash')(algorithm);

  data.forEach((datum) => hash.update(datum));

  return Uint8Array.from(hash.digest());
}
