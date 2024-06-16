import Argon2Type from '../enums/Argon2Type';
import Argon2Version from '../enums/Argon2Version';
import KdfParameterKey from '../enums/KdfParameterKey';
import KdfUuid from '../enums/KdfUuid';
import VariantMapFieldType from '../enums/VariantMapFieldType';
import type { KdfParameters } from '../header/types';
import validateVariantFieldBigInt from '../header/validateVariantFieldBigInt';
import validateVariantFieldNumber from '../header/validateVariantFieldNumber';
import validateVariantFieldUint8Array from '../header/validateVariantFieldUint8Array';
import displayUuid from '../utilities/displayUuid';
import { type VariantMap } from './types';

export default function parseKdfParameters(
  variants: VariantMap,
): KdfParameters {
  const variantData = variants[KdfParameterKey.Uuid];

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
      return {
        // Upgrade Kdbx3 automatically to Kdbx4.
        uuid: KdfUuid.AesKdbx4,
        rounds: validateRounds(
          validateVariantFieldBigInt(KdfParameterKey.AesRounds, variants),
        ),
        seed: validateSeed(
          validateVariantFieldUint8Array(KdfParameterKey.AesSeed, variants),
        ),
      };
    case KdfUuid.Argon2d:
    case KdfUuid.Argon2id:
      return {
        iterations: validateRounds(
          validateVariantFieldBigInt(
            KdfParameterKey.Argon2Iterations,
            variants,
          ),
        ),
        memoryInKibibytes: validateArgonMemory(
          validateVariantFieldBigInt(KdfParameterKey.Argon2Memory, variants),
        ),
        parallelism: validateArgonParallelism(
          validateVariantFieldBigInt(
            KdfParameterKey.Argon2Parallelism,
            variants,
            true,
          ),
        ),
        seed: validateSeed(
          validateVariantFieldUint8Array(KdfParameterKey.Argon2Salt, variants),
        ),
        type:
          uuid === KdfUuid.Argon2d ? Argon2Type.Argon2d : Argon2Type.Argon2id,
        uuid,
        version: validateArgonVersion(
          validateVariantFieldNumber(KdfParameterKey.Argon2Version, variants),
        ),
      };
    default:
      throw new Error(`Unknown KDF UUID encountered "${uuid}"`);
  }
}

function validateArgonMemory(memoryBytes: bigint): bigint {
  const ARGON2_MEMORY_MIN = BigInt(8);
  const ARGON2_MEMORY_MAX = BigInt(1) << BigInt(32); // 4,294,967,296

  const memoryAsKibibytes = memoryBytes / BigInt(1024);

  if (
    memoryAsKibibytes < ARGON2_MEMORY_MIN &&
    memoryAsKibibytes >= ARGON2_MEMORY_MAX
  ) {
    throw new Error(
      `Invalid memory size. Expected between ${ARGON2_MEMORY_MIN} and ${ARGON2_MEMORY_MAX}, got ${memoryAsKibibytes}`,
    );
  }

  return memoryAsKibibytes;
}

function validateArgonParallelism(threads: bigint): bigint {
  const ARGON2_THREADS_MIN = BigInt(1);
  const ARGON2_THREADS_MAX = BigInt(1 << 24); // 16,777,216

  if (threads < ARGON2_THREADS_MIN && threads >= ARGON2_THREADS_MAX) {
    throw new Error(
      `Invalid number of threads. Expected between ${ARGON2_THREADS_MIN} and ${ARGON2_THREADS_MAX}, got ${threads}`,
    );
  }

  return threads;
}

function validateArgonVersion(version: number): Argon2Version {
  const supportedVersions: number[] = Object.values(Argon2Version);

  if (!supportedVersions.includes(version)) {
    throw new Error(
      `Invalid Argon2 version. Expected between ${Argon2Version.V10} and ${Argon2Version.V13}, got ${version}`,
    );
  }

  return version as Argon2Version;
}

function validateRounds(rounds: bigint): bigint {
  if (rounds < BigInt(1) || rounds > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error(
      `Invalid number of rounds. Expected between 1 and ${Number.MAX_SAFE_INTEGER}, got ${rounds}`,
    );
  }

  return rounds;
}

function validateSeed(seed: Uint8Array): Uint8Array {
  const KDF_MIN_SEED_SIZE = 8;
  const KDF_MAX_SEED_SIZE = 32;

  if (
    seed.byteLength < KDF_MIN_SEED_SIZE ||
    seed.byteLength > KDF_MAX_SEED_SIZE
  ) {
    throw new Error(
      `Invalid seed size. Expected between ${KDF_MIN_SEED_SIZE} and ${KDF_MAX_SEED_SIZE}, got ${seed.byteLength}`,
    );
  }

  return seed;
}
