import HashAlgorithm from '../enums/HashAlgorithm';
import KdfUuid from '../enums/KdfUuid';
import type {
  AesKdfParameters,
  Argon2KdfParameters,
  KdfParameters,
} from '../header/types';
import type { CryptoImplementation } from './types';

async function transformKdfAes(
  crypto: CryptoImplementation,
  key: Uint8Array,
  parameters: AesKdfParameters,
): Promise<Uint8Array> {
  const result = await crypto.transformAesKdfKey(
    key,
    parameters.seed,
    parameters.rounds,
  );

  return await crypto.hash(HashAlgorithm.Sha256, [result]);
}

async function transformKdfArgon2(
  crypto: CryptoImplementation,
  key: Uint8Array,
  parameters: Argon2KdfParameters,
): Promise<Uint8Array> {
  return await crypto.transformArgon2KdfKey(
    key,
    parameters.seed,
    parameters.version,
    parameters.type,
    parameters.memoryInKibibytes,
    parameters.parallelism,
    parameters.iterations,
  );
}

export default async function transformKdf(
  crypto: CryptoImplementation,
  parameters: KdfParameters,
  key: Uint8Array,
): Promise<Uint8Array> {
  switch (parameters.uuid) {
    case KdfUuid.Argon2d:
    case KdfUuid.Argon2id:
      return await transformKdfArgon2(crypto, key, parameters);

    case KdfUuid.AesKdbx3:
    case KdfUuid.AesKdbx4:
      return await transformKdfAes(crypto, key, parameters);
  }
}
