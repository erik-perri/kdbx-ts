import SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import SymmetricCipherUuid from '../../enums/SymmetricCipherUuid';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

const algorithmToUuidMapping: Partial<
  Record<SymmetricCipherAlgorithm, SymmetricCipherUuid>
> = {
  [SymmetricCipherAlgorithm.Aes128_CBC]: SymmetricCipherUuid.Aes128,
  [SymmetricCipherAlgorithm.Aes256_CBC]: SymmetricCipherUuid.Aes256,
  [SymmetricCipherAlgorithm.Twofish_CBC]: SymmetricCipherUuid.Twofish,
  [SymmetricCipherAlgorithm.ChaCha20]: SymmetricCipherUuid.ChaCha20,
} as const;

export default function serializeCipherAlgorithmValue(
  algorithm: SymmetricCipherAlgorithm,
): Uint8Array {
  const uuid = algorithmToUuidMapping[algorithm];

  if (uuid === undefined) {
    throw new Error(`Unsupported cipher algorithm "${algorithm}"`);
  }

  return Uint8ArrayHelper.fromUuid(uuid);
}
