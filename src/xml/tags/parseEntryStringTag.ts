import { type Element } from '@xmldom/xmldom';

import { type EntryAttribute } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseEntryStringTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<EntryAttribute> {
  reader.assertTag(element, 'String');

  let key: string | undefined;
  let value: string | undefined;
  let isProtected: boolean | undefined;

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Key':
        key = reader.readStringValue(child);
        break;

      case 'Value':
        [value, isProtected] =
          await reader.readPotentiallyProtectedStringValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (key === undefined || value === undefined) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return {
    isProtected: isProtected ?? false,
    key,
    value,
  };
}
