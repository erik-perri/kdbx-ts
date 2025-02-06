import { type Entry } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseEntryTag from './parseEntryTag';

export default async function parseEntryHistoryTag(
  reader: KdbxXmlReader,
): Promise<Entry[]> {
  reader.expect('History');

  const history: Entry[] = [];

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Entry':
        history.push(await parseEntryTag(element, true));
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  return history;
}
