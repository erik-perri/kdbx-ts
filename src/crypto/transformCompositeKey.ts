import HashAlgorithm from '../enums/HashAlgorithm';
import type { KdbxHeader } from '../header/types';
import {
  isChallengeResponseKey,
  isKdbxProcessedKey,
  type KdbxChallengeResponseKey,
  type KdbxKey,
  type KdbxProcessedKey,
} from '../keys/types';
import transformKdf from './transformKdf';
import type { CryptoImplementation } from './types';

export default async function transformCompositeKey(
  crypto: CryptoImplementation,
  header: KdbxHeader,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  const processedKeys = keys.filter((key): key is KdbxProcessedKey =>
    isKdbxProcessedKey(key),
  );
  const keyData: Uint8Array[] = processedKeys.map((key) => key.data);

  keyData.push(await challengeKeys(crypto, header.kdfParameters.seed, keys));

  const hash = await crypto.hash(HashAlgorithm.Sha256, keyData);

  return await transformKdf(crypto, header.kdfParameters, hash);
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
