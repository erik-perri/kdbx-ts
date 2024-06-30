import { getDependency } from '../dependencies';
import HashAlgorithm from '../enums/HashAlgorithm';
import KdfUuid from '../enums/KdfUuid';
import { type KdbxKdfParameters } from '../types/format';
import { type KdbxKey } from '../types/keys';
import isChallengeResponseKey from '../utilities/isChallengeResponseKey';
import isKdbxProcessedKey from '../utilities/isKdbxProcessedKey';
import processHash from './processHash';

export default async function transformCompositeKey(
  parameters: KdbxKdfParameters,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  const processedKeys = keys.filter(isKdbxProcessedKey);
  const keyData: Uint8Array[] = processedKeys.map((key) => key.data);

  keyData.push(await challengeKeys(parameters.seed, keys));

  const hash = await processHash(HashAlgorithm.Sha256, keyData);

  switch (parameters.uuid) {
    case KdfUuid.Argon2d:
    case KdfUuid.Argon2id:
      return await getDependency('transformArgon2KdfKey')(hash, parameters);

    case KdfUuid.AesKdbx3:
    case KdfUuid.AesKdbx4:
      return await processHash(HashAlgorithm.Sha256, [
        await getDependency('transformAes256KdfKey')(hash, parameters),
      ]);
  }
}

async function challengeKeys(
  seed: Uint8Array,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  const challengeKeys = keys.filter(isChallengeResponseKey);
  if (!challengeKeys.length) {
    return Uint8Array.from([]);
  }

  const responses: Uint8Array[] = [];
  for (const key of challengeKeys) {
    responses.push(await key.challenge(seed));
  }

  return await processHash(HashAlgorithm.Sha256, responses);
}
