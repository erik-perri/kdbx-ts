import { type KdbxChallengeResponseKey, type KdbxKey } from '../types/keys';

export default function isChallengeResponseKey(
  key: KdbxKey,
): key is KdbxChallengeResponseKey {
  return (
    typeof (key as Partial<KdbxChallengeResponseKey>).challenge === 'function'
  );
}
