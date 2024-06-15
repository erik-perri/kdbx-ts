import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';

const innerFieldDisplayMap: Record<InnerHeaderFieldId, string> = {
  [InnerHeaderFieldId.End]: 'End',
  [InnerHeaderFieldId.InnerRandomStreamID]: 'InnerRandomStreamID',
  [InnerHeaderFieldId.InnerRandomStreamKey]: 'InnerRandomStreamKey',
  [InnerHeaderFieldId.Binary]: 'Binary',
};

export default function displayInnerHeaderFieldId(
  id: InnerHeaderFieldId,
): string {
  return innerFieldDisplayMap[id];
}
