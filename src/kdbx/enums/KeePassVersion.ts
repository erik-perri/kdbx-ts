const KeePassVersion = Object.freeze({
  Unknown: 'unknown',
  KeePass1: 'keepass1',
  KeePass2: 'keepass2',
} as const);

type KeePassVersion = (typeof KeePassVersion)[keyof typeof KeePassVersion];

export default KeePassVersion;
