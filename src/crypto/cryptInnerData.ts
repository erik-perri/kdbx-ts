import HashAlgorithm from '../enums/HashAlgorithm';
import type SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import type SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import { type CryptoImplementation } from './types';

export default async function cryptInnerData(
  crypto: CryptoImplementation,
  direction: SymmetricCipherDirection,
  cipherAlgorithm: SymmetricCipherAlgorithm,
  masterSeed: Uint8Array,
  encryptionIV: Uint8Array,
  compositeKey: Uint8Array,
  data: Uint8Array,
): Promise<Uint8Array> {
  const finalKey = await crypto.hash(HashAlgorithm.Sha256, [
    masterSeed,
    compositeKey,
  ]);

  const cipher = await crypto.createCipher(
    cipherAlgorithm,
    direction,
    finalKey,
    encryptionIV,
  );

  return await cipher.finish(data);
}
