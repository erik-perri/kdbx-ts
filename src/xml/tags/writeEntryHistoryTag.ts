import type { Element } from '@xmldom/xmldom';

import { type Entry } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeEntryTag from './writeEntryTag';

export default async function writeEntryHistoryTag(
  writer: KdbxXmlWriter,
  history: Entry[] | undefined,
): Promise<Element> {
  const element = writer.createElement('History');

  if (history !== undefined) {
    for (const entry of history) {
      element.appendChild(await writeEntryTag(writer, entry, true));
    }
  }

  return element;
}
