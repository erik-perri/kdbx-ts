import { type CryptoImplementation } from '../crypto/types';
import HashAlgorithm from '../enums/HashAlgorithm';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';
import { type KdbxProcessedKey } from './types';

export default async function createPasswordKey(
  crypto: CryptoImplementation,
  password: string,
): Promise<KdbxProcessedKey> {
  const data = await crypto.hash(HashAlgorithm.Sha256, [
    Uint8ArrayHelper.fromString(password),
  ]);

  return { data };
}
