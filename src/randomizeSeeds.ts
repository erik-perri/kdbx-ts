import { type CryptoImplementation } from './types/crypto';
import {
  type KdbxFile,
  type KdbxInnerHeader,
  type KdbxKdfParameters,
  type KdbxOuterHeader,
} from './types/format';
import getSymmetricCipherIvSize from './utilities/getSymmetricCipherIvSize';
import getSymmetricCipherKeySize from './utilities/getSymmetricCipherKeySize';

export default async function randomizeSeeds(
  crypto: CryptoImplementation,
  file: KdbxFile,
): Promise<KdbxFile> {
  const kdfSeed = await crypto.randomBytes(
    file.header.kdfParameters.seed.byteLength,
  );

  const kdfParameters: KdbxKdfParameters = {
    ...file.header.kdfParameters,
    seed: kdfSeed,
  };

  const header: KdbxOuterHeader = {
    ...file.header,
    encryptionIV: await crypto.randomBytes(
      getSymmetricCipherIvSize(file.header.cipherAlgorithm),
    ),
    kdfParameters,
    masterSeed: await crypto.randomBytes(32),
  };

  const innerHeader: KdbxInnerHeader = {
    ...file.innerHeader,
    innerEncryptionKey: await crypto.randomBytes(
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
