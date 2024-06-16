import { type CryptoImplementation } from './crypto/types';
import { type KdbxKey } from './keys/types';
import type { KdbxDatabase4 } from './version4/types';
import writeDatabase from './version4/writeDatabase';

export default async function writeKdbxFile(
  crypto: CryptoImplementation,
  database: KdbxDatabase4,
  keys: KdbxKey[],
): Promise<Uint8Array> {
  return writeDatabase(crypto, database, keys);
}
