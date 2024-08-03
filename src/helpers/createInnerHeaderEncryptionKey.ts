import { getDependency } from '../dependencies';
import type SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import getSymmetricCipherKeySize from '../utilities/getSymmetricCipherKeySize';

export default async function createInnerHeaderEncryptionKey(
  cipher: SymmetricCipherAlgorithm,
): Promise<Uint8Array> {
  const randomBytes = getDependency('randomBytes');

  return await randomBytes(getSymmetricCipherKeySize(cipher));
}
