import { KeePass2 } from '../constants';
import { getDependency } from '../dependencies';
import KdfUuid from '../enums/KdfUuid';
import validateKdfRounds from '../outerHeader/fields/validators/validateKdfRounds';
import validateKdfSeed from '../outerHeader/fields/validators/validateKdfSeed';
import { type KdbxAesKdfParameters } from '../types/format';

export default async function createAesKdfParameters(
  rounds: bigint,
  seed?: Uint8Array,
): Promise<KdbxAesKdfParameters> {
  const randomBytes = getDependency('randomBytes');

  return {
    rounds: validateKdfRounds(rounds),
    seed: validateKdfSeed(seed ?? (await randomBytes(32))),
    uuid: KdfUuid.AesKdbx4,
    variantMapVersion: KeePass2.variantMapVersion,
  };
}
