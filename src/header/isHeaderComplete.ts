import type { KdbxHeader } from './types';

export default function isHeaderComplete(
  header: Partial<KdbxHeader>,
): header is KdbxHeader {
  return (
    header.cipherId !== undefined &&
    header.cipherMode !== undefined &&
    header.compressionAlgorithm !== undefined &&
    header.encryptionIV !== undefined &&
    header.kdfParameters !== undefined &&
    header.masterSeed !== undefined
  );
}
