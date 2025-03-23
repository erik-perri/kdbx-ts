import type { Element } from '@xmldom/xmldom';

import {
  type CustomData,
  type CustomDataWithTimes,
} from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeCustomDataTag(
  writer: KdbxXmlWriter,
  data: Record<string, CustomData | CustomDataWithTimes | undefined>,
  withTimes: boolean,
): Element {
  const element = writer.createElement('CustomData');

  for (const item of Object.values(data)) {
    if (!item) {
      continue;
    }

    element.appendChild(writeCustomDataItemTag(writer, item, withTimes));
  }

  return element;
}

function writeCustomDataItemTag(
  writer: KdbxXmlWriter,
  data: CustomData | CustomDataWithTimes,
  withTimes: boolean,
): Element {
  const element = writer.createElement('Item');

  element.appendChild(writer.writeString('Key', data.key));
  element.appendChild(writer.writeString('Value', data.value));

  if (
    withTimes &&
    isCustomDataWithTimes(data) &&
    data.lastModified !== undefined
  ) {
    element.appendChild(writer.writeDateTime('Times', data.lastModified));
  }

  return element;
}

function isCustomDataWithTimes(
  data: CustomData | CustomDataWithTimes,
): data is CustomDataWithTimes {
  return (data as Partial<CustomDataWithTimes>).lastModified !== undefined;
}
