import { type Icon } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeIconTag(writer: KdbxXmlWriter, icon: Icon): void {
  writer.writeStartElement('Icon');

  writer.writeUuid('UUID', icon.uuid, true);

  if (icon.name !== undefined) {
    writer.writeString('Name', icon.name);
  }

  if (icon.lastModificationTime !== undefined) {
    writer.writeDateTime('LastModificationTime', icon.lastModificationTime);
  }

  writer.writeBinary('Data', icon.data);

  writer.writeEndElement();
}
