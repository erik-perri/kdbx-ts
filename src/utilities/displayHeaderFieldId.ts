import HeaderFieldId from '../enums/HeaderFieldId';

const headerFieldDisplayMap: Record<HeaderFieldId, string> = {
  [HeaderFieldId.EndOfHeader]: 'EndOfHeader',
  [HeaderFieldId.Comment]: 'Comment',
  [HeaderFieldId.CipherID]: 'CipherID',
  [HeaderFieldId.CompressionFlags]: 'CompressionFlags',
  [HeaderFieldId.MasterSeed]: 'MasterSeed',
  [HeaderFieldId.TransformSeed]: 'TransformSeed',
  [HeaderFieldId.TransformRounds]: 'TransformRounds',
  [HeaderFieldId.EncryptionIV]: 'EncryptionIV',
  [HeaderFieldId.ProtectedStreamKey]: 'ProtectedStreamKey',
  [HeaderFieldId.StreamStartBytes]: 'StreamStartBytes',
  [HeaderFieldId.InnerRandomStreamID]: 'InnerRandomStreamID',
  [HeaderFieldId.KdfParameters]: 'KdfParameters',
  [HeaderFieldId.PublicCustomData]: 'PublicCustomData',
};

export default function displayHeaderFieldId(id: HeaderFieldId): string {
  return headerFieldDisplayMap[id];
}
