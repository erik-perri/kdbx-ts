import { KeePass2 } from '../constants';
import { getDependency } from '../dependencies';
import Argon2Type from '../enums/Argon2Type';
import Argon2Version from '../enums/Argon2Version';
import KdfUuid from '../enums/KdfUuid';
import benchmarkKdfKey from './benchmarkKdfKey';

export default async function benchmarkArgon2KdfKey(
  targetMilliseconds: number,
  memoryInBytes: bigint = BigInt(65536 * 1024),
  parallelism: bigint = BigInt(2),
  type: Argon2Type = Argon2Type.Argon2d,
  version: Argon2Version = Argon2Version.V13,
): Promise<number> {
  const randomBytes = getDependency('randomBytes');
  const transformer = getDependency('transformArgon2KdfKey');

  const key = await randomBytes(16);
  const seed = await randomBytes(16);
  const kdfParameters = {
    iterations: BigInt(10),
    memoryInBytes: memoryInBytes,
    parallelism: parallelism,
    seed,
    type,
    uuid: type === Argon2Type.Argon2d ? KdfUuid.Argon2d : KdfUuid.Argon2id,
    variantMapVersion: KeePass2.variantMapVersion,
    version,
  };

  return benchmarkKdfKey(transformer, {
    key,
    parameterToBenchmark: 'iterations',
    parameters: kdfParameters,
    targetMilliseconds,
    trials: 3,
  });
}
