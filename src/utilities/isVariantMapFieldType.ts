import VariantMapFieldType from '../enums/VariantMapFieldType';

export default function isVariantMapFieldType(
  type: number,
): type is VariantMapFieldType {
  const values: number[] = Object.values(VariantMapFieldType);

  return values.includes(type);
}
