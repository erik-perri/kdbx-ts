import KdfParameterKey from '../enums/KdfParameterKey';
import KdfUuid from '../enums/KdfUuid';
import VariantMapFieldType from '../enums/VariantMapFieldType';
import type { KdfParameters } from '../header/types';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import { type VariantMap } from './types';

export default function serializeKdfParameters(
  parameters: KdfParameters,
): VariantMap {
  switch (parameters.uuid) {
    case KdfUuid.AesKdbx3:
    case KdfUuid.AesKdbx4:
      return {
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
      };

    case KdfUuid.Argon2d:
    case KdfUuid.Argon2id:
      return {
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
          value: parameters.memoryInKibibytes * BigInt(1024),
        },
        [KdfParameterKey.Argon2Iterations]: {
          type: VariantMapFieldType.UInt64,
          value: parameters.iterations,
        },
        [KdfParameterKey.Argon2Version]: {
          type: VariantMapFieldType.UInt32,
          value: parameters.version,
        },
      };
  }
}
