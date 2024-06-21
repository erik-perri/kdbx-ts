import type CustomDataItem from '../../structure/CustomDateTime';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseCustomDataTag(
  reader: KdbxXmlReader,
): Record<string, CustomDataItem | undefined> {
  reader.assertOpenedTagOf('CustomData');

  const customData: Record<string, CustomDataItem | undefined> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Item': {
        const item = parseCustomDataItemTag(reader.readFromCurrent());

        if (!item.key || !item.value) {
          throw new Error('Missing custom data key or value');
        }

        customData[item.key] = item;
        break;
      }

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "CustomData"`,
        );
    }
  }

  return customData;
}

function parseCustomDataItemTag(reader: KdbxXmlReader): CustomDataItem {
  reader.assertOpenedTagOf('Item');

  const customData: Partial<CustomDataItem> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Key':
        customData.key = reader.readStringValue();
        break;

      case 'Value':
        customData.value = reader.readStringValue();
        break;

      case 'LastModificationTime':
        customData.lastModified = reader.readDateTimeValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Item"`,
        );
    }
  }

  if (!isCustomDataItemComplete(customData)) {
    throw new Error('Found "Item" tag with incomplete data');
  }

  return customData;
}

function isCustomDataItemComplete(
  item: Partial<CustomDataItem>,
): item is CustomDataItem {
  return item.key !== undefined && item.value !== undefined;
}
