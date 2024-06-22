import { type MetadataCustomIcons } from '../../structure/Metadata';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeIconTag from './writeIconTag';

export default function writeCustomIconsTag(
  writer: KdbxXmlWriter,
  customIcons: MetadataCustomIcons,
): void {
  writer.writeStartElement('CustomIcons');

  for (const icon of Object.values(customIcons)) {
    if (icon === undefined) {
      continue;
    }

    writeIconTag(writer, icon);
  }

  writer.writeEndElement();
}
