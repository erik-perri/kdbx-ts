import { type MetadataCustomIcons } from '../../structure/Metadata';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import serializeIconTag from './serializeIconTag';

export default function serializeCustomIconsTag(
  writer: KdbxXmlWriter,
  customIcons: MetadataCustomIcons,
): void {
  if (isEmpty(customIcons)) {
    return;
  }

  writer.writeStartElement('CustomIcons');

  for (const icon of Object.values(customIcons)) {
    if (icon === undefined) {
      continue;
    }

    serializeIconTag(writer, icon);
  }

  writer.writeEndElement();
}

function isEmpty(customIcons: MetadataCustomIcons): boolean {
  return Object.keys(customIcons).length === 0;
}
