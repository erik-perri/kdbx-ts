import processHash from '../crypto/processHash';
import HashAlgorithm from '../enums/HashAlgorithm';
import { type KdbxPasswordKey } from '../types/keys';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';

export default async function createPasswordKey(
  password: string,
): Promise<KdbxPasswordKey> {
  const data = await processHash(HashAlgorithm.Sha256, [
    Uint8ArrayHelper.fromString(password),
  ]);

  return { data };
}
