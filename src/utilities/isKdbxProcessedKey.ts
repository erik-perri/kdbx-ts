import { type KdbxKey, type KdbxProcessedKey } from '../types/keys';

export default function isKdbxProcessedKey(
  key: KdbxKey,
): key is KdbxProcessedKey {
  return ArrayBuffer.isView((key as Partial<KdbxProcessedKey>).data);
}
