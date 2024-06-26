import { type Database } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseMetaTag from './parseMetaTag';
import parseRootTag from './parseRootTag';

export default async function parseKeePassFileTag(
  reader: KdbxXmlReader,
): Promise<Database> {
  reader.assertOpenedTagOf('KeePassFile');

  const database: Partial<Database> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Meta':
        if (database.metadata) {
          throw new Error('Unexpected duplicate Meta element found');
        }

        database.metadata = await parseMetaTag(reader.readFromCurrent());
        break;

      case 'Root': {
        if (database.root) {
          throw new Error('Unexpected duplicate Root element found');
        }

        database.root = await parseRootTag(reader.readFromCurrent());
        break;
      }

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "KeePassFile"`,
        );
    }
  }

  if (!isDatabaseComplete(database)) {
    throw new Error('Found "KeePassFile" tag with incomplete data');
  }

  return database;
}

function isDatabaseComplete(database: Partial<Database>): database is Database {
  return database.metadata !== undefined && database.root !== undefined;
}
