import type EntryAttribute from '../../structure/EntryAttribute';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default async function writeEntryStringTag(
  writer: KdbxXmlWriter,
  attribute: EntryAttribute,
): Promise<void> {
  writer.writeStartElement('String');
  writer.writeString('Key', attribute.key);

  if (attribute.isProtected) {
    await writer.writeProtectedString('Value', attribute.value);
  } else {
    writer.writeString('Value', attribute.value);
  }

  writer.writeEndElement();
}
