import { type Element } from '@xmldom/xmldom';

import { type Database } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseMetaTag from './parseMetaTag';
import parseRootTag from './parseRootTag';

export default async function parseKeePassFileTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<Database> {
  reader.assertTag(element, 'KeePassFile');

  const database: Partial<Database> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Meta':
        database.metadata = await parseMetaTag(reader, child);
        break;

      case 'Root':
        database.root = await parseRootTag(reader, child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" found in "${element.tagName}"`,
        );
    }
  }

  if (!isDatabaseComplete(database)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return database;
}

function isDatabaseComplete(database: Partial<Database>): database is Database {
  return database.metadata !== undefined && database.root !== undefined;
}
