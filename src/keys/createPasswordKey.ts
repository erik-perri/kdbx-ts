import HashAlgorithm from '../enums/HashAlgorithm';
import { type CryptoImplementation } from '../types/crypto';
import { type KdbxPasswordKey } from '../types/keys';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';

export default async function createPasswordKey(
  crypto: CryptoImplementation,
  password: string,
): Promise<KdbxPasswordKey> {
  const data = await crypto.hash(HashAlgorithm.Sha256, [
    Uint8ArrayHelper.fromString(password),
  ]);

  return { data };
}
