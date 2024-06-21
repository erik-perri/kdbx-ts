import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import displaySymmetricCipherMode from '../utilities/displaySymmetricCipherMode';
import { KeePass2 } from '../versions';
import type { CryptoCipher, CryptoImplementation } from './types';

export default async function createInnerStreamCipher(
  crypto: CryptoImplementation,
  mode: SymmetricCipherMode,
  key: Uint8Array,
): Promise<CryptoCipher> {
  switch (mode) {
    case SymmetricCipherMode.Salsa20:
      return crypto.createCipher(
        SymmetricCipherMode.Salsa20,
        SymmetricCipherDirection.Encrypt,
        await crypto.hash(HashAlgorithm.Sha256, [key]),
        KeePass2.innerStreamSalsa20IV,
      );
    case SymmetricCipherMode.ChaCha20: {
      const keyIV = await crypto.hash(HashAlgorithm.Sha512, [key]);

      return crypto.createCipher(
        SymmetricCipherMode.ChaCha20,
        SymmetricCipherDirection.Encrypt,
        keyIV.subarray(0, 32),
        keyIV.subarray(32, 44),
      );
    }
    default:
      throw new Error(
        `Invalid inner stream cipher mode ${displaySymmetricCipherMode(mode)}`,
      );
  }
}
