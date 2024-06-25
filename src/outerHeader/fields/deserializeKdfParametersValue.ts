import Argon2Type from '../../enums/Argon2Type';
import KdfParameterKey from '../../enums/KdfParameterKey';
import KdfUuid from '../../enums/KdfUuid';
import VariantMapFieldType from '../../enums/VariantMapFieldType';
import {
  type KdbxKdfParameters,
  type KdbxVariantMap,
} from '../../types/format';
import displayUuid from '../../utilities/displayUuid';
import deserializeVariantMapValue from './deserializeVariantMapValue';
import validateKdfArgon2Memory from './validators/validateKdfArgon2Memory';
import validateKdfArgon2Parallelism from './validators/validateKdfArgon2Parallelism';
import validateKdfArgon2Version from './validators/validateKdfArgon2Version';
import validateKdfRounds from './validators/validateKdfRounds';
import validateKdfSeed from './validators/validateKdfSeed';
import validateVariantValueBigInt from './validators/validateVariantValueBigInt';
import validateVariantValueNumber from './validators/validateVariantValueNumber';
import validateVariantValueNumeric from './validators/validateVariantValueNumeric';
import validateVariantValueUint8Array from './validators/validateVariantValueUint8Array';

export default function deserializeKdfParametersValue(
  data: Uint8Array,
): KdbxKdfParameters {
  const variantMap = deserializeVariantMapValue(data);

  const variantData = variantMap.values[KdfParameterKey.Uuid];

  if (variantData === undefined) {
    throw new Error('KDF UUID not found in variant map');
  }

  if (variantData.type !== VariantMapFieldType.ByteArray) {
    throw new Error(
      `Invalid KDF UUID data found. Expected ByteArray, got ${variantData.type}`,
    );
  }

  const uuid = displayUuid(variantData.value);

  switch (uuid) {
    case KdfUuid.AesKdbx3:
    case KdfUuid.AesKdbx4:
      return parseAesParameterVariantMap(uuid, variantMap);

    case KdfUuid.Argon2d:
    case KdfUuid.Argon2id:
      return parseArgon2ParametersVariantMap(uuid, variantMap);

    default:
      throw new Error(`Unknown KDF UUID encountered "${uuid}"`);
  }
}

function parseAesParameterVariantMap(
  uuid: typeof KdfUuid.AesKdbx3 | typeof KdfUuid.AesKdbx4,
  variantMap: KdbxVariantMap,
): KdbxKdfParameters {
  return {
    // TODO Upgrade Kdbx3 automatically to Kdbx4?
    uuid: uuid,
    rounds: validateKdfRounds(
      validateVariantValueBigInt(KdfParameterKey.AesRounds, variantMap.values),
    ),
    seed: validateKdfSeed(
      validateVariantValueUint8Array(
        KdfParameterKey.AesSeed,
        variantMap.values,
      ),
    ),
    variantMapVersion: variantMap.version,
  };
}

function parseArgon2ParametersVariantMap(
  uuid: typeof KdfUuid.Argon2d | typeof KdfUuid.Argon2id,
  variantMap: KdbxVariantMap,
): KdbxKdfParameters {
  return {
    iterations: validateKdfRounds(
      validateVariantValueBigInt(
        KdfParameterKey.Argon2Iterations,
        variantMap.values,
      ),
    ),
    memoryInBytes: validateKdfArgon2Memory(
      validateVariantValueBigInt(
        KdfParameterKey.Argon2Memory,
        variantMap.values,
      ),
    ),
    parallelism: validateKdfArgon2Parallelism(
      validateVariantValueNumeric(
        KdfParameterKey.Argon2Parallelism,
        variantMap.values,
      ),
    ),
    seed: validateKdfSeed(
      validateVariantValueUint8Array(
        KdfParameterKey.Argon2Salt,
        variantMap.values,
      ),
    ),
    type: uuid === KdfUuid.Argon2d ? Argon2Type.Argon2d : Argon2Type.Argon2id,
    uuid,
    version: validateKdfArgon2Version(
      validateVariantValueNumber(
        KdfParameterKey.Argon2Version,
        variantMap.values,
      ),
    ),
    variantMapVersion: variantMap.version,
  };
}
