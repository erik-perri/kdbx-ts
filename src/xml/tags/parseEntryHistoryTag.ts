import type Entry from '../../structure/Entry';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseEntryTag from './parseEntryTag';

export default async function parseEntryHistoryTag(
  reader: KdbxXmlReader,
): Promise<Entry[]> {
  reader.assertOpenedTagOf('History');

  const history: Entry[] = [];

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Entry':
        history.push(await parseEntryTag(reader.readFromCurrent(), true));
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "History"`,
        );
    }
  }

  return history;
}
