import HashAlgorithm from '../enums/HashAlgorithm';
import KdfUuid from '../enums/KdfUuid';
import { type CryptoImplementation } from '../types/crypto';
import { type KdbxKdfParameters } from '../types/format';

export default async function transformKdf(
  crypto: CryptoImplementation,
  parameters: KdbxKdfParameters,
  key: Uint8Array,
): Promise<Uint8Array> {
  switch (parameters.uuid) {
    case KdfUuid.Argon2d:
    case KdfUuid.Argon2id:
      return await crypto.transformArgon2KdfKey(
        key,
        parameters.seed,
        parameters.version,
        parameters.type,
        parameters.memoryInBytes / BigInt(1024),
        parameters.parallelism,
        parameters.iterations,
      );

    case KdfUuid.AesKdbx3:
    case KdfUuid.AesKdbx4:
      return await crypto.hash(HashAlgorithm.Sha256, [
        await crypto.transformAesKdfKey(
          key,
          parameters.seed,
          parameters.rounds,
        ),
      ]);
  }
}
