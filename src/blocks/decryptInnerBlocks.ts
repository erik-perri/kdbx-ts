import pako from 'pako';

import { type CryptoImplementation } from '../crypto/types';
import CompressionAlgorithm from '../enums/CompressionAlgorithm';
import HashAlgorithm from '../enums/HashAlgorithm';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';
import { type KdbxOuterHeader } from '../types';

export default async function decryptInnerBlocks(
  crypto: CryptoImplementation,
  header: KdbxOuterHeader,
  compositeKey: Uint8Array,
  blocks: Uint8Array[],
): Promise<Uint8Array> {
  const finalKey = await crypto.hash(HashAlgorithm.Sha256, [
    header.masterSeed,
    compositeKey,
  ]);

  const cipher = await crypto.createCipher(
    header.cipherAlgorithm,
    SymmetricCipherDirection.Decrypt,
    finalKey,
    header.encryptionIV,
  );

  const processedBytes = await cipher.finish(
    blocks.reduce(
      (previous, current) => Uint8Array.from([...previous, ...current]),
      new Uint8Array(0),
    ),
  );

  return header.compressionAlgorithm === CompressionAlgorithm.GZip
    ? pako.inflate(processedBytes)
    : processedBytes;
}
