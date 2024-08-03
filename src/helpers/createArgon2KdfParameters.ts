import { KeePass2 } from '../constants';
import { getDependency } from '../dependencies';
import Argon2Type from '../enums/Argon2Type';
import Argon2Version from '../enums/Argon2Version';
import KdfUuid from '../enums/KdfUuid';
import validateKdfArgon2Memory from '../outerHeader/fields/validators/validateKdfArgon2Memory';
import validateKdfArgon2Parallelism from '../outerHeader/fields/validators/validateKdfArgon2Parallelism';
import validateKdfRounds from '../outerHeader/fields/validators/validateKdfRounds';
import validateKdfSeed from '../outerHeader/fields/validators/validateKdfSeed';
import { type KdbxArgon2KdfParameters } from '../types/format';

export default async function createArgon2KdfParameters(
  iterations: bigint,
  memoryInBytes: bigint,
  parallelism: bigint,
  type: Argon2Type,
  seed?: Uint8Array,
): Promise<KdbxArgon2KdfParameters> {
  const randomBytes = getDependency('randomBytes');

  return {
    iterations: validateKdfRounds(iterations),
    memoryInBytes: validateKdfArgon2Memory(memoryInBytes),
    parallelism: validateKdfArgon2Parallelism(parallelism),
    seed: validateKdfSeed(seed ?? (await randomBytes(32))),
    type,
    uuid: type === Argon2Type.Argon2d ? KdfUuid.Argon2d : KdfUuid.Argon2id,
    variantMapVersion: KeePass2.variantMapVersion,
    version: Argon2Version.V13,
  };
}
