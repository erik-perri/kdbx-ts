import DefaultIconNumber from '../enums/DefaultIconNumber';

export function isDefaultIconNumber(id: number): id is DefaultIconNumber {
  const values: number[] = Object.values(DefaultIconNumber);

  return values.includes(id);
}
