import { type Element } from '@xmldom/xmldom';

import { type Icon, type Uuid } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseIconTag from './parseIconTag';

export default async function parseCustomIconsTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<Record<Uuid, Icon | undefined>> {
  reader.assertTag(element, 'CustomIcons');

  const icons: Record<Uuid, Icon | undefined> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Icon': {
        const icon = await parseIconTag(reader, child);

        icons[icon.uuid] = icon;
        break;
      }

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  return icons;
}
