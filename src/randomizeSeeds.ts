import { getDependency } from './dependencies';
import {
  type KdbxFile,
  type KdbxInnerHeader,
  type KdbxKdfParameters,
  type KdbxOuterHeader,
} from './types/format';
import getSymmetricCipherIvSize from './utilities/getSymmetricCipherIvSize';
import getSymmetricCipherKeySize from './utilities/getSymmetricCipherKeySize';

export default async function randomizeSeeds(
  file: KdbxFile,
): Promise<KdbxFile> {
  const randomBytes = getDependency('randomBytes');

  const kdfSeed = await randomBytes(file.header.kdfParameters.seed.byteLength);

  const kdfParameters: KdbxKdfParameters = {
    ...file.header.kdfParameters,
    seed: kdfSeed,
  };

  const header: KdbxOuterHeader = {
    ...file.header,
    encryptionIV: await randomBytes(
      getSymmetricCipherIvSize(file.header.cipherAlgorithm),
    ),
    kdfParameters,
    masterSeed: await randomBytes(32),
  };

  const innerHeader: KdbxInnerHeader = {
    ...file.innerHeader,
    innerEncryptionKey: await randomBytes(
      getSymmetricCipherKeySize(file.innerHeader.innerEncryptionAlgorithm),
    ),
  };

  return {
    signature: file.signature,
    header,
    innerHeader,
    database: file.database,
  };
}
