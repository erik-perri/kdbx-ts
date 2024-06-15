import type Database from '../../structure/Database';
import { isDatabaseComplete } from '../../structure/utilities';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import { type BinaryPool } from '../types';
import parseMetaTag from './parseMetaTag';
import parseRootTag from './parseRootTag';

export default async function parseKeePassFileTag(
  reader: KdbxXmlReader,
  binaryPool: BinaryPool,
): Promise<Database> {
  reader.assertOpenedTagOf('KeePassFile');

  const database: Partial<Database> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Meta':
        if (database.metadata) {
          throw new Error('Multiple Meta elements');
        }

        database.metadata = await parseMetaTag(reader.readFromCurrent());
        break;

      case 'Root': {
        if (database.rootGroup) {
          throw new Error('Multiple Root elements');
        }

        const { rootGroup, deletedObjects } = await parseRootTag(
          reader.readFromCurrent(),
          binaryPool,
        );

        database.rootGroup = rootGroup;
        database.deletedObjects = deletedObjects;
        break;
      }

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isDatabaseComplete(database)) {
    throw new Error('Failed to parse a complete database from the XML data');
  }

  return database;
}
