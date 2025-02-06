import type { Element } from '@xmldom/xmldom';

import {
  type CustomData,
  type CustomDataWithTimes,
} from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseCustomDataTag(
  reader: KdbxXmlReader,
  element: Element,
  withTimes: true,
): Record<string, CustomDataWithTimes | undefined>;

export default function parseCustomDataTag(
  reader: KdbxXmlReader,
  element: Element,
  withTimes: false,
): Record<string, CustomData | undefined>;

export default function parseCustomDataTag(
  reader: KdbxXmlReader,
  element: Element,
  withTimes: boolean,
): Record<string, CustomData | CustomDataWithTimes | undefined> {
  reader.assertTag(element, 'CustomData');

  const customData: Record<string, CustomData | undefined> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Item': {
        const item = parseCustomDataItemTag(reader, child, withTimes);

        if (!item.key || !item.value) {
          throw new Error('Missing custom data key or value');
        }

        customData[item.key] = item;
        break;
      }

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  return customData;
}

function parseCustomDataItemTag(
  reader: KdbxXmlReader,
  element: Element,
  withTimes: boolean,
): CustomData | CustomDataWithTimes {
  reader.assertTag(element, 'Item');

  const customData: Partial<CustomDataWithTimes> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Key':
        customData.key = reader.readStringValue(child);
        break;

      case 'Value':
        customData.value = reader.readStringValue(child);
        break;

      case 'LastModificationTime':
        if (!withTimes) {
          throw new Error(
            'Unexpected "LastModificationTime" tag in custom data item',
          );
        }
        customData.lastModified = reader.readDateTimeValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (!isCustomDataItemComplete(customData)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return customData;
}

function isCustomDataItemComplete(
  item: Partial<CustomData | CustomDataWithTimes>,
): item is CustomData | CustomDataWithTimes {
  return item.key !== undefined && item.value !== undefined;
}
