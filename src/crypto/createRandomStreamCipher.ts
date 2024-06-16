import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import SymmetricCipherMode from '../enums/SymmetricCipherMode';
import { KeePass2 } from '../header/versions';
import displaySymmetricCipherMode from '../utilities/displaySymmetricCipherMode';
import type { CryptoCipher, CryptoImplementation } from './types';

export default async function createRandomStreamCipher(
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
      const keyIv = await crypto.hash(HashAlgorithm.Sha512, [key]);

      return crypto.createCipher(
        SymmetricCipherMode.ChaCha20,
        SymmetricCipherDirection.Encrypt,
        keyIv.subarray(0, 32),
        keyIv.subarray(32, 44),
      );
    }
    default:
      throw new Error(
        `Invalid stream cipher mode ${displaySymmetricCipherMode(mode)}`,
      );
  }
}
