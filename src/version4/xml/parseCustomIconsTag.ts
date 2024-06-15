import type Icon from '../../structure/Icon';
import type { Uuid } from '../../structure/Uuid';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseIconTag from './parseIconTag';

export default async function parseCustomIconsTag(
  reader: KdbxXmlReader,
): Promise<Record<Uuid, Icon | undefined>> {
  reader.assertOpenedTagOf('CustomIcons');

  const icons: Record<Uuid, Icon | undefined> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Icon': {
        const icon = await parseIconTag(reader.readFromCurrent());

        icons[icon.uuid] = icon;
        break;
      }

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  return icons;
}
