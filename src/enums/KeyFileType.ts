const FileKeyType = Object.freeze({
  None: 0,
  Hashed: 1,
  KeePass2XML: 2,
  KeePass2XMLv2: 3,
  FixedBinary: 4,
  FixedBinaryHex: 5,
} as const);

type FileKeyType = (typeof FileKeyType)[keyof typeof FileKeyType];

export default FileKeyType;
