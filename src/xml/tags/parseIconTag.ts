import { type Element } from '@xmldom/xmldom';

import { type Icon } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseIconTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<Icon> {
  reader.assertTag(element, 'Icon');

  const icon: Partial<Icon> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'UUID':
        icon.uuid = await reader.readUuidValue(child);
        break;

      case 'Data':
        icon.data = await reader.readBinaryValue(child);
        break;

      case 'Name':
        icon.name = reader.readStringValue(child);
        break;

      case 'LastModificationTime':
        icon.lastModificationTime = reader.readDateTimeValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (!isIconComplete(icon)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return icon;
}

function isIconComplete(icon: Partial<Icon>): icon is Icon {
  return icon.data !== undefined && icon.uuid !== undefined;
}
