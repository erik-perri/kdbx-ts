import type EntryAttachment from '../../structure/EntryAttachment';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeEntryBinaryTag(
  writer: KdbxXmlWriter,
  attachment: EntryAttachment,
): void {
  writer.writeStartElement('Binary');

  writer.writeString('Key', attachment.key);

  writer.writeStartElement('Value');
  writer.writeAttribute('Ref', attachment.ref);
  writer.writeEndElement();

  writer.writeEndElement();
}
