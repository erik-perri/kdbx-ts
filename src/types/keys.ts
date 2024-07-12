import type KeyFileType from '../enums/KeyFileType';

export type KdbxProcessedKey = {
  data: Uint8Array;
};

export type KdbxPasswordKey = KdbxProcessedKey;

export type KdbxFileKey = KdbxProcessedKey & {
  type: KeyFileType;
};

export type KdbxChallengeResponseKey = {
  challenge(data: Uint8Array): Promise<Uint8Array>;
};

export type KdbxKey = KdbxProcessedKey | KdbxFileKey | KdbxChallengeResponseKey;

export type KdbxCompositeKey = Uint8Array;
