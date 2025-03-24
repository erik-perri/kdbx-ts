import { KeePass2 } from './constants';
import { getDependency } from './dependencies';
import Argon2Type from './enums/Argon2Type';
import Argon2Version from './enums/Argon2Version';
import KdfUuid from './enums/KdfUuid';

/**
 * Returns an estimate of how many iterations can be performed in the
 * target time.
 */
export default async function benchmarkArgon2KdfKey(
  targetMilliseconds: number,
  memoryInBytes: bigint = BigInt(65536 * 1024),
  parallelism: bigint = BigInt(2),
  type: Argon2Type = Argon2Type.Argon2d,
  version: Argon2Version = Argon2Version.V13,
): Promise<number> {
  const transformer = getDependency('transformArgon2KdfKey');

  const key = Uint8Array.from({ length: 16 }, () => 0x7e);

  const parameters = {
    iterations: BigInt(10),
    memoryInBytes: memoryInBytes,
    parallelism: parallelism,
    seed: key,
    type,
    uuid: type === Argon2Type.Argon2d ? KdfUuid.Argon2d : KdfUuid.Argon2id,
    variantMapVersion: KeePass2.variantMapVersion,
    version,
  };

  const startTime = Date.now();

  await transformer(key, parameters);

  const duration = BigInt(Date.now() - startTime);

  return Math.floor(
    Number(parameters.iterations * (BigInt(targetMilliseconds) / duration)),
  );
}
