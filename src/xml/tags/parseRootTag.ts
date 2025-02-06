import { type Element } from '@xmldom/xmldom';

import { type DatabaseRoot } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseDeletedObjectsTag from './parseDeletedObjectsTag';
import parseGroupTag from './parseGroupTag';

export default async function parseRootTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<DatabaseRoot> {
  reader.assertTag(element, 'Root');

  const result: Partial<DatabaseRoot> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Group':
        result.group = await parseGroupTag(reader, child);
        break;

      case 'DeletedObjects':
        result.deletedObjects = await parseDeletedObjectsTag(reader, child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (!isDatabaseRootComplete(result)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return result;
}

function isDatabaseRootComplete(
  results: Partial<DatabaseRoot>,
): results is DatabaseRoot {
  return results.group !== undefined;
}
