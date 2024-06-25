import KdfParameterKey from '../../enums/KdfParameterKey';
import KdfUuid from '../../enums/KdfUuid';
import VariantMapFieldType from '../../enums/VariantMapFieldType';
import {
  type KdbxAesKdfParameters,
  type KdbxArgon2KdfParameters,
  type KdbxKdfParameters,
  type KdbxVariantMap,
} from '../../types/format';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import serializeVariantMapValue from './serializeVariantMapValue';

export default function serializeKdfParametersValue(
  data: KdbxKdfParameters,
): Uint8Array {
  switch (data.uuid) {
    case KdfUuid.Argon2d:
    case KdfUuid.Argon2id:
      return serializeVariantMapValue(getArgon2VariantMap(data));

    case KdfUuid.AesKdbx3:
    case KdfUuid.AesKdbx4:
      return serializeVariantMapValue(getAesVariantMap(data));
  }
}

function getAesVariantMap(parameters: KdbxAesKdfParameters): KdbxVariantMap {
  return {
    values: {
      [KdfParameterKey.Uuid]: {
        type: VariantMapFieldType.ByteArray,
        value: Uint8ArrayHelper.fromUuid(parameters.uuid),
      },
      [KdfParameterKey.AesRounds]: {
        type: VariantMapFieldType.UInt64,
        value: parameters.rounds,
      },
      [KdfParameterKey.AesSeed]: {
        type: VariantMapFieldType.ByteArray,
        value: parameters.seed,
      },
    },
    version: parameters.variantMapVersion,
  };
}

function getArgon2VariantMap(
  parameters: KdbxArgon2KdfParameters,
): KdbxVariantMap {
  return {
    values: {
      [KdfParameterKey.Argon2Salt]: {
        type: VariantMapFieldType.ByteArray,
        value: parameters.seed,
      },
      [KdfParameterKey.Argon2Parallelism]: {
        type: VariantMapFieldType.UInt64,
        value: parameters.parallelism,
      },
      [KdfParameterKey.Argon2Memory]: {
        type: VariantMapFieldType.UInt64,
        value: parameters.memoryInBytes,
      },
      [KdfParameterKey.Argon2Iterations]: {
        type: VariantMapFieldType.UInt64,
        value: parameters.iterations,
      },
      [KdfParameterKey.Argon2Version]: {
        type: VariantMapFieldType.UInt32,
        value: parameters.version,
      },
    },
    version: parameters.variantMapVersion,
  };
}
