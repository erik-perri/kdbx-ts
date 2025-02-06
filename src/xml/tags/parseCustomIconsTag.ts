import { type Icon, type Uuid } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseIconTag from './parseIconTag';

export default async function parseCustomIconsTag(
  reader: KdbxXmlReader,
): Promise<Record<Uuid, Icon | undefined>> {
  reader.expect('CustomIcons');

  const icons: Record<Uuid, Icon | undefined> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Icon': {
        const icon = await parseIconTag(element);

        icons[icon.uuid] = icon;
        break;
      }

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  return icons;
}
