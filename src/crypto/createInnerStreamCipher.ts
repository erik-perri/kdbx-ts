import { KeePass2 } from '../constants';
import { type SymmetricCipher } from '../dependencies';
import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import displaySymmetricCipherAlgorithm from '../utilities/displaySymmetricCipherAlgorithm';
import createSymmetricCipher from './createSymmetricCipher';
import processHash from './processHash';

export default async function createInnerStreamCipher(
  algorithm: SymmetricCipherAlgorithm,
  key: Uint8Array,
): Promise<SymmetricCipher> {
  switch (algorithm) {
    case SymmetricCipherAlgorithm.Salsa20:
      return createSymmetricCipher(
        SymmetricCipherAlgorithm.Salsa20,
        SymmetricCipherDirection.Encrypt,
        await processHash(HashAlgorithm.Sha256, [key]),
        KeePass2.innerStreamSalsa20IV,
      );

    case SymmetricCipherAlgorithm.ChaCha20: {
      const hash = await processHash(HashAlgorithm.Sha512, [key]);

      return createSymmetricCipher(
        SymmetricCipherAlgorithm.ChaCha20,
        SymmetricCipherDirection.Encrypt,
        hash.subarray(0, 32),
        hash.subarray(32, 44),
      );
    }

    case SymmetricCipherAlgorithm.Aes256_CBC:
    case SymmetricCipherAlgorithm.Twofish_CBC:
    default:
      throw new Error(
        `Invalid inner stream cipher algorithm ${displaySymmetricCipherAlgorithm(algorithm)}`,
      );
  }
}
