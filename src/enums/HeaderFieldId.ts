const HeaderFieldId = Object.freeze({
  EndOfHeader: 0,
  Comment: 1,
  CipherID: 2,
  CompressionFlags: 3,
  MasterSeed: 4,
  TransformSeed: 5,
  TransformRounds: 6,
  EncryptionIV: 7,
  ProtectedStreamKey: 8,
  StreamStartBytes: 9,
  InnerRandomStreamID: 10,
  KdfParameters: 11,
  PublicCustomData: 12,
} as const);

type HeaderFieldId = (typeof HeaderFieldId)[keyof typeof HeaderFieldId];

export default HeaderFieldId;
