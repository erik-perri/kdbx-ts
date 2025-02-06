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
  reader.expect('CustomData');

  const customData: Record<string, CustomData | undefined> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Item': {
        const item = parseCustomDataItemTag(element, withTimes);

        if (!item.key || !item.value) {
          throw new Error('Missing custom data key or value');
        }

        customData[item.key] = item;
        break;
      }

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  return customData;
}

function parseCustomDataItemTag(
  reader: KdbxXmlReader,
  withTimes: boolean,
): CustomData | CustomDataWithTimes {
  reader.expect('Item');

  const customData: Partial<CustomDataWithTimes> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Key':
        customData.key = element.readStringValue();
        break;

      case 'Value':
        customData.value = element.readStringValue();
        break;

      case 'LastModificationTime':
        if (!withTimes) {
          throw new Error(
            'Unexpected "LastModificationTime" tag in custom data item',
          );
        }
        customData.lastModified = element.readDateTimeValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (!isCustomDataItemComplete(customData)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return customData;
}

function isCustomDataItemComplete(
  item: Partial<CustomData | CustomDataWithTimes>,
): item is CustomData | CustomDataWithTimes {
  return item.key !== undefined && item.value !== undefined;
}
