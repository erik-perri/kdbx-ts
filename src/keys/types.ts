import type KeyFileType from '../enums/KeyFileType';

export type KdbxProcessedKey = {
  data: Uint8Array;
};

export type KdbPasswordKey = KdbxProcessedKey;

export type KdbxFileKey = KdbxProcessedKey & {
  type: KeyFileType;
};

export type KdbxChallengeResponseKey = {
  challenge(data: Uint8Array): Promise<Uint8Array>;
};

export type KdbxKey = KdbPasswordKey | KdbxFileKey | KdbxChallengeResponseKey;

export function isKdbxProcessedKey(key: KdbxKey): key is KdbxProcessedKey {
  return (key as Partial<KdbxProcessedKey>).data !== undefined;
}

export function isChallengeResponseKey(
  key: KdbxKey,
): key is KdbxChallengeResponseKey {
  return (key as Partial<KdbxChallengeResponseKey>).challenge !== undefined;
}
