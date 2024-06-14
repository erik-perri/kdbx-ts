import HeaderFieldId from '../enums/HeaderFieldId';

export function isKdbxHeaderFieldId(id: number): id is HeaderFieldId {
  const values: number[] = Object.values(HeaderFieldId);

  return values.includes(id);
}
