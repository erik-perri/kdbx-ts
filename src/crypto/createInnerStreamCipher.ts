import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import type { CryptoCipher, CryptoImplementation } from '../types/crypto';
import displaySymmetricCipherAlgorithm from '../utilities/displaySymmetricCipherAlgorithm';
import { KeePass2 } from '../versions';

export default async function createInnerStreamCipher(
  crypto: CryptoImplementation,
  algorithm: SymmetricCipherAlgorithm,
  key: Uint8Array,
): Promise<CryptoCipher> {
  switch (algorithm) {
    case SymmetricCipherAlgorithm.Salsa20:
      return crypto.createCipher(
        SymmetricCipherAlgorithm.Salsa20,
        SymmetricCipherDirection.Encrypt,
        await crypto.hash(HashAlgorithm.Sha256, [key]),
        KeePass2.innerStreamSalsa20IV,
      );
    case SymmetricCipherAlgorithm.ChaCha20: {
      const keyIV = await crypto.hash(HashAlgorithm.Sha512, [key]);

      return crypto.createCipher(
        SymmetricCipherAlgorithm.ChaCha20,
        SymmetricCipherDirection.Encrypt,
        keyIV.subarray(0, 32),
        keyIV.subarray(32, 44),
      );
    }
    default:
      throw new Error(
        `Invalid inner stream cipher algorithm ${displaySymmetricCipherAlgorithm(algorithm)}`,
      );
  }
}
