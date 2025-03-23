import { type Element } from '@xmldom/xmldom';

import { type Icon } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeIconTag(
  writer: KdbxXmlWriter,
  icon: Icon,
): Element {
  const element = writer.createElement('Icon');

  element.appendChild(writer.writeUuid('UUID', icon.uuid, true));

  if (icon.name !== undefined) {
    element.appendChild(writer.writeString('Name', icon.name));
  }

  if (icon.lastModificationTime !== undefined) {
    element.appendChild(
      writer.writeDateTime('LastModificationTime', icon.lastModificationTime),
    );
  }

  element.appendChild(writer.writeBinary('Data', icon.data));

  return element;
}
