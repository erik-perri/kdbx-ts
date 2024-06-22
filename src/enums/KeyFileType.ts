const FileKeyType = Object.freeze({
  Hashed: 1,
} as const);

type FileKeyType = (typeof FileKeyType)[keyof typeof FileKeyType];

export default FileKeyType;
