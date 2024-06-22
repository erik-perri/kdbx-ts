import SymmetricCipherAlgorithm from '../../enums/SymmetricCipherAlgorithm';
import SymmetricCipherUuid from '../../enums/SymmetricCipherUuid';
import displayUuid from '../../utilities/displayUuid';

const uuidToAlgorithmMapping: Record<
  string,
  SymmetricCipherAlgorithm | undefined
> = Object.freeze({
  [SymmetricCipherUuid.Aes128]: SymmetricCipherAlgorithm.Aes128_CBC,
  [SymmetricCipherUuid.Aes256]: SymmetricCipherAlgorithm.Aes256_CBC,
  [SymmetricCipherUuid.Twofish]: SymmetricCipherAlgorithm.Twofish_CBC,
  [SymmetricCipherUuid.ChaCha20]: SymmetricCipherAlgorithm.ChaCha20,
} as const);

export default function deserializeCipherAlgorithmValue(
  data: Uint8Array,
): SymmetricCipherAlgorithm {
  if (data.byteLength !== 16) {
    throw new Error(
      `Invalid cipher algorithm length. Expected 16 bytes, got ${data.byteLength}`,
    );
  }

  const uuid = displayUuid(data);
  const algorithm = uuidToAlgorithmMapping[uuid];

  if (!algorithm) {
    throw new Error(`Unsupported cipher "${uuid}"`);
  }

  return algorithm;
}
