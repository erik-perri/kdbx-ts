import { type Element } from '@xmldom/xmldom';

import { type Entry } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseEntryTag from './parseEntryTag';

export default async function parseEntryHistoryTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<Entry[]> {
  reader.assertTag(element, 'History');

  const history: Entry[] = [];

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Entry':
        history.push(await parseEntryTag(reader, child, true));
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  return history;
}
