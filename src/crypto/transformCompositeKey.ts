import HashAlgorithm from '../enums/HashAlgorithm';
import type { CryptoImplementation } from '../types/crypto';
import { type KdbxKdfParameters } from '../types/format';
import { type KdbxKey } from '../types/keys';
import isChallengeResponseKey from '../utilities/isChallengeResponseKey';
import isKdbxProcessedKey from '../utilities/isKdbxProcessedKey';
import transformKdf from './transformKdf';

export default async function transformCompositeKey(
  crypto: CryptoImplementation,
  kdfParameters: KdbxKdfParameters,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  const processedKeys = keys.filter(isKdbxProcessedKey);
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
  const challengeKeys = keys.filter(isChallengeResponseKey);
  if (!challengeKeys.length) {
    return Uint8Array.from([]);
  }

  const responses: Uint8Array[] = [];
  for (const key of challengeKeys) {
    responses.push(await key.challenge(seed));
  }

  return await crypto.hash(HashAlgorithm.Sha256, responses);
}
