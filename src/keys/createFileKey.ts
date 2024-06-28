import processHash from '../crypto/processHash';
import HashAlgorithm from '../enums/HashAlgorithm';
import KeyFileType from '../enums/KeyFileType';
import { type KdbxFileKey } from '../types/keys';

export default async function createFileKey(
  bytes: Uint8Array,
): Promise<KdbxFileKey> {
  // TODO Determine type base on file structure, only falling back to processHash
  //      if unknown structure.

  return createFileKeyHashed(bytes);
}

async function createFileKeyHashed(bytes: Uint8Array): Promise<KdbxFileKey> {
  const data = await processHash(HashAlgorithm.Sha256, [bytes]);

  return {
    data,
    type: KeyFileType.Hashed,
  };
}
