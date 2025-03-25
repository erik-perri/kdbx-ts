import { KeePass2 } from '../constants';
import { getDependency } from '../dependencies';
import KdfUuid from '../enums/KdfUuid';
import benchmarkKdfKey from './benchmarkKdfKey';

export default async function benchmarkAes256KdfKey(
  targetMilliseconds: number,
): Promise<number> {
  const randomBytes = getDependency('randomBytes');
  const transformer = getDependency('transformAes256KdfKey');

  const key = await randomBytes(16);
  const seed = await randomBytes(32);
  const kdfParameters = {
    rounds: BigInt(100000),
    seed,
    uuid: KdfUuid.AesKdbx4,
    variantMapVersion: KeePass2.variantMapVersion,
  };

  return await benchmarkKdfKey(transformer, {
    key,
    parameterToBenchmark: 'rounds',
    parameters: kdfParameters,
    targetMilliseconds,
    trials: 3,
  });
}
