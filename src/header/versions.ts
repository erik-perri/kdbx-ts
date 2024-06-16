import KeePassVersion from '../enums/KeePassVersion';

export const KeePass1 = Object.freeze({
  fileVersion: 0x00030002,
  fileVersionCriticalMask: 0xffffff00,
  signature1: 0x9aa2d903,
  signature2: 0xb54bfb65,
  version: KeePassVersion.KeePass1,
} as const);

export const KeePass2 = Object.freeze({
  fileVersion20: 0x00020000,
  fileVersion30: 0x00030000,
  fileVersion31: 0x00030001,
  fileVersion40: 0x00040000,
  fileVersion41: 0x00040001,
  fileVersionCriticalMask: 0xffff0000,
  innerStreamSalsa20IV: Uint8Array.from([
    0xe8, 0x30, 0x09, 0x4b, 0x97, 0x20, 0x5d, 0x2a,
  ]),
  signature1: 0x9aa2d903,
  signature2: 0xb54bfb67,
  variantMapCriticalMask: 0xff00,
  variantMapVersion: 0x0100,
  version: KeePassVersion.KeePass2,
} as const);

export function findVersionFromSignature(
  signature1: number,
  signature2: number,
): KeePassVersion {
  const details = [KeePass1, KeePass2].find(
    (version) =>
      version.signature1 === signature1 && version.signature2 === signature2,
  );

  return details?.version ?? KeePassVersion.Unknown;
}
