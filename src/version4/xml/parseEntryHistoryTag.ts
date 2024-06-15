import type Entry from '../../structure/Entry';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import type { BinaryPool } from '../types';
import parseEntryTag from './parseEntryTag';

export default async function parseEntryHistoryTag(
  reader: KdbxXmlReader,
  binaryPool: BinaryPool,
): Promise<Entry[]> {
  reader.assertOpenedTagOf('History');

  const history: Entry[] = [];

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Entry':
        history.push(
          await parseEntryTag(reader.readFromCurrent(), binaryPool, true),
        );
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  return history;
}
