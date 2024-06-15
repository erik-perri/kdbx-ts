import InnerHeaderFieldId from '../enums/InnerHeaderFieldId';

export default function isInnerHeaderFieldId(
  type: number,
): type is InnerHeaderFieldId {
  const values: number[] = Object.values(InnerHeaderFieldId);

  return values.includes(type);
}
