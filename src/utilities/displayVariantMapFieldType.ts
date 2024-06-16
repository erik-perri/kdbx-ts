import VariantMapFieldType from '../enums/VariantMapFieldType';

const variantMapFieldTypeDisplayMap: Record<VariantMapFieldType, string> = {
  [VariantMapFieldType.End]: 'End',
  [VariantMapFieldType.Bool]: 'Bool',
  [VariantMapFieldType.Int32]: 'Int32',
  [VariantMapFieldType.UInt32]: 'UInt32',
  [VariantMapFieldType.Int64]: 'Int64',
  [VariantMapFieldType.UInt64]: 'UInt64',
  [VariantMapFieldType.String]: 'String',
  [VariantMapFieldType.ByteArray]: 'ByteArray',
};

export default function displayVariantMapFieldType(
  type: VariantMapFieldType,
): string {
  return variantMapFieldTypeDisplayMap[type];
}
