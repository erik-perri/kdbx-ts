import HashAlgorithm from '../enums/HashAlgorithm';
import {
  isChallengeResponseKey,
  isKdbxProcessedKey,
  type KdbxChallengeResponseKey,
  type KdbxKey,
  type KdbxProcessedKey,
} from '../keys/types';
import { type KdbxKdfParameters } from '../types';
import transformKdf from './transformKdf';
import type { CryptoImplementation } from './types';

export default async function transformCompositeKey(
  crypto: CryptoImplementation,
  kdfParameters: KdbxKdfParameters,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  const processedKeys = keys.filter((key): key is KdbxProcessedKey =>
    isKdbxProcessedKey(key),
  );
  const keyData: Uint8Array[] = processedKeys.map((key) => key.data);

  keyData.push(await challengeKeys(crypto, kdfParameters.seed, keys));

  const hash = await crypto.hash(HashAlgorithm.Sha256, keyData);

  return await transformKdf(crypto, kdfParameters, hash);
}

async function challengeKeys(
  crypto: CryptoImplementation,
  seed: Uint8Array,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  const challengeKeys: KdbxChallengeResponseKey[] = keys.filter(
    (key): key is KdbxChallengeResponseKey => isChallengeResponseKey(key),
  );
  if (!challengeKeys.length) {
    return Uint8Array.from([]);
  }

  const responses: Uint8Array[] = [];
  for (const key of challengeKeys) {
    responses.push(await key.challenge(seed));
  }

  return await crypto.hash(HashAlgorithm.Sha256, responses);
}
