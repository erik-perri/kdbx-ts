import { getDependency } from './dependencies';
import {
  type KdbxFile,
  type KdbxInnerHeader,
  type KdbxKdfParameters,
  type KdbxOuterHeaderFields,
} from './types/format';
import getSymmetricCipherIvSize from './utilities/getSymmetricCipherIvSize';
import getSymmetricCipherKeySize from './utilities/getSymmetricCipherKeySize';

export default async function randomizeSeeds(
  file: KdbxFile,
): Promise<KdbxFile> {
  const randomBytes = getDependency('randomBytes');

  const kdfSeed = await randomBytes(
    file.outerHeader.fields.kdfParameters.seed.byteLength,
  );

  const kdfParameters: KdbxKdfParameters = {
    ...file.outerHeader.fields.kdfParameters,
    seed: kdfSeed,
  };

  const fields: KdbxOuterHeaderFields = {
    ...file.outerHeader.fields,
    encryptionIV: await randomBytes(
      getSymmetricCipherIvSize(file.outerHeader.fields.cipherAlgorithm),
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
    database: file.database,
    innerHeader,
    outerHeader: {
      fields,
      signature: file.outerHeader.signature,
    },
  };
}
