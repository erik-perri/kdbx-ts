import HashAlgorithm from '../enums/HashAlgorithm';
import type SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import { type KdbxOuterHeader } from '../types';
import { type CryptoImplementation } from './types';

export default async function cryptInnerData(
  crypto: CryptoImplementation,
  header: KdbxOuterHeader,
  compositeKey: Uint8Array,
  direction: SymmetricCipherDirection,
  data: Uint8Array,
): Promise<Uint8Array> {
  const finalKey = await crypto.hash(HashAlgorithm.Sha256, [
    header.masterSeed,
    compositeKey,
  ]);

  const cipher = await crypto.createCipher(
    header.cipherAlgorithm,
    direction,
    finalKey,
    header.encryptionIV,
  );

  return await cipher.finish(data);
}
