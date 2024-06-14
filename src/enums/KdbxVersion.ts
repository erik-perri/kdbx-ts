const KdbxVersion = Object.freeze({
  Version41: 0x00040001,
  Version40: 0x00040000,
  Version31: 0x00030001,
  Version30: 0x00030000,
  Version20: 0x00020000,
} as const);

type KdbxVersion = (typeof KdbxVersion)[keyof typeof KdbxVersion];

export default KdbxVersion;
