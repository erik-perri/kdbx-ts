import KeePassVersion from './enums/KeePassVersion';

export const KeePass1 = Object.freeze({
  signature1: 0x9aa2d903,
  signature2: 0xb54bfb65,
  version: KeePassVersion.KeePass1,
} as const);

export const KeePass2 = Object.freeze({
  innerStreamSalsa20IV: Uint8Array.from([
    0xe8, 0x30, 0x09, 0x4b, 0x97, 0x20, 0x5d, 0x2a,
  ]),
  signature1: 0x9aa2d903,
  signature2: 0xb54bfb67,
  variantMapCriticalMask: 0xff00,
  variantMapVersion: 0x0100,
  version: KeePassVersion.KeePass2,
} as const);
