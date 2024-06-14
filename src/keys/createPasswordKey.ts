import { type CryptoImplementation } from '../crypto/types';
import HashAlgorithm from '../enums/HashAlgorithm';
import Uint8ArrayWriter from '../utilities/Uint8ArrayWriter';
import { type KdbxProcessedKey } from './types';

export default async function createPasswordKey(
  crypto: CryptoImplementation,
  password: string,
): Promise<KdbxProcessedKey> {
  const data = await crypto.hash(HashAlgorithm.Sha256, [
    Uint8ArrayWriter.fromString(password),
  ]);

  return { data };
}
