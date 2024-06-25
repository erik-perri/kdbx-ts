import { type KdbxChallengeResponseKey } from '../types/keys';

export default function createChallengeResponseKey(
  challenge: (data: Uint8Array) => Promise<Uint8Array>,
): KdbxChallengeResponseKey {
  return {
    challenge,
  };
}
