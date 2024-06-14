import { type CryptoImplementation } from '../crypto/types';
import HashAlgorithm from '../enums/HashAlgorithm';
import KeyFileType from '../enums/KeyFileType';
import { type KdbxFileKey } from './types';

async function createFileKeyHashed(
  crypto: CryptoImplementation,
  bytes: Uint8Array,
): Promise<KdbxFileKey> {
  const data = await crypto.hash(HashAlgorithm.Sha256, [bytes]);

  return {
    data,
    type: KeyFileType.Hashed,
  };
}

export default async function createFileKey(
  crypto: CryptoImplementation,
  bytes: Uint8Array,
): Promise<KdbxFileKey> {
  // TODO Determine type base on file structure, only falling back to hash
  //      if unknown structure.

  return createFileKeyHashed(crypto, bytes);
}
