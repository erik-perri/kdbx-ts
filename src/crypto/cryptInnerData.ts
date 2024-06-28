import HashAlgorithm from '../enums/HashAlgorithm';
import type SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import type SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import createSymmetricCipher from './createSymmetricCipher';
import processHash from './processHash';

export default async function cryptInnerData(
  direction: SymmetricCipherDirection,
  algorithm: SymmetricCipherAlgorithm,
  masterSeed: Uint8Array,
  encryptionIV: Uint8Array,
  compositeKey: Uint8Array,
  data: Uint8Array,
): Promise<Uint8Array> {
  const finalKey = await processHash(HashAlgorithm.Sha256, [
    masterSeed,
    compositeKey,
  ]);

  const cipher = await createSymmetricCipher(
    algorithm,
    direction,
    finalKey,
    encryptionIV,
  );

  return await cipher.finish(data);
}
