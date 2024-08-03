import { getDependency } from '../dependencies';
import type SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import getSymmetricCipherIvSize from '../utilities/getSymmetricCipherIvSize';

export default async function createOuterHeaderEncryptionIV(
  cipher: SymmetricCipherAlgorithm,
): Promise<Uint8Array> {
  const randomBytes = getDependency('randomBytes');

  return await randomBytes(getSymmetricCipherIvSize(cipher));
}
