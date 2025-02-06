import { type Database } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseMetaTag from './parseMetaTag';
import parseRootTag from './parseRootTag';

export default async function parseKeePassFileTag(
  reader: KdbxXmlReader,
): Promise<Database> {
  reader.expect('KeePassFile');

  const database: Partial<Database> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Meta':
        database.metadata = await parseMetaTag(element);
        break;

      case 'Root':
        database.root = await parseRootTag(element);
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" found in "${reader.tagName}"`,
        );
    }
  }

  if (!isDatabaseComplete(database)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return database;
}

function isDatabaseComplete(database: Partial<Database>): database is Database {
  return database.metadata !== undefined && database.root !== undefined;
}
