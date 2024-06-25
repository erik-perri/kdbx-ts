import {
  type CustomData,
  type CustomDataWithTimes,
} from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseCustomDataTag(
  reader: KdbxXmlReader,
  withTimes: true,
): Record<string, CustomDataWithTimes | undefined>;

export default function parseCustomDataTag(
  reader: KdbxXmlReader,
  withTimes: false,
): Record<string, CustomData | undefined>;

export default function parseCustomDataTag(
  reader: KdbxXmlReader,
  withTimes: boolean,
): Record<string, CustomData | CustomDataWithTimes | undefined> {
  reader.assertOpenedTagOf('CustomData');

  const customData: Record<string, CustomData | undefined> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Item': {
        const item = parseCustomDataItemTag(
          reader.readFromCurrent(),
          withTimes,
        );

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

function parseCustomDataItemTag(
  reader: KdbxXmlReader,
  withTimes: boolean,
): CustomData | CustomDataWithTimes {
  reader.assertOpenedTagOf('Item');

  const customData: Partial<CustomDataWithTimes> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Key':
        customData.key = reader.readStringValue();
        break;

      case 'Value':
        customData.value = reader.readStringValue();
        break;

      case 'LastModificationTime':
        if (!withTimes) {
          throw new Error(
            'Unexpected "LastModificationTime" tag in custom data item',
          );
        }
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
  item: Partial<CustomData | CustomDataWithTimes>,
): item is CustomData | CustomDataWithTimes {
  return item.key !== undefined && item.value !== undefined;
}
