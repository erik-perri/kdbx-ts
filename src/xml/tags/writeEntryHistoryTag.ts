import type Entry from '../../types/database/Entry';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeEntryTag from './writeEntryTag';

export default async function writeEntryHistoryTag(
  writer: KdbxXmlWriter,
  history: Entry[] | undefined,
): Promise<void> {
  writer.writeStartElement('History');

  if (history !== undefined) {
    for (const entry of history) {
      await writeEntryTag(writer, entry, true);
    }
  }

  writer.writeEndElement();
}
