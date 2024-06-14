const KeePassVersion = Object.freeze({
  Unknown: 0,
  KeePass1: 1,
  KeePass2: 2,
} as const);

type KeePassVersion = (typeof KeePassVersion)[keyof typeof KeePassVersion];

export default KeePassVersion;
