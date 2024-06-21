import HeaderFieldId from '../enums/HeaderFieldId';

export function isHeaderFieldId(id: number): id is HeaderFieldId {
  const values: number[] = Object.values(HeaderFieldId);

  return values.includes(id);
}
