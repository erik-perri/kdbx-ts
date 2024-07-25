import { KeePass2 } from './constants';
import { getDependency } from './dependencies';
import KdfUuid from './enums/KdfUuid';

export default async function benchmarkAes256KdfKey(
  targetMilliseconds: number,
): Promise<number> {
  const transformer = getDependency('transformAes256KdfKey');

  const key = Uint8Array.from({ length: 16 }, () => 0x7e);
  const seed = Uint8Array.from({ length: 32 }, () => 0x4b);

  const trials = 3;
  const rounds = 100000;
  const parameters = {
    rounds: BigInt(rounds),
    seed,
    uuid: KdfUuid.AesKdbx4,
    variantMapVersion: KeePass2.variantMapVersion,
  };

  const startTime = Date.now();

  for (let i = 0; i < trials; ++i) {
    await transformer(key, parameters);
  }

  const duration = Date.now() - startTime;

  return Math.floor((rounds * trials * targetMilliseconds) / duration);
}
