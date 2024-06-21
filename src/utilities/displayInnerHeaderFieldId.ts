import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';

const innerFieldDisplayMap: Record<InnerHeaderFieldId, string> = {
  [InnerHeaderFieldId.EndOfHeader]: 'End',
  [InnerHeaderFieldId.InnerStreamMode]: 'InnerStreamMode',
  [InnerHeaderFieldId.InnerStreamKey]: 'InnerStreamKey',
  [InnerHeaderFieldId.Binary]: 'Binary',
};

export default function displayInnerHeaderFieldId(
  id: InnerHeaderFieldId,
): string {
  return innerFieldDisplayMap[id];
}
