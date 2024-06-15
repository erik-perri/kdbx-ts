import { type CryptoCipher } from '../../crypto/types';
import type Database from '../../structure/Database';
import { isDatabaseComplete } from '../../structure/utilities';
import { type XmlReader } from '../../utilities/XmlReader';
import { type BinaryPool } from '../types';
import parseMetaTag from './parseMetaTag';
import parseRootTag from './parseRootTag';

export default async function parseKeePassFileTag(
  reader: XmlReader,
  binaryPool: BinaryPool,
  randomStream: CryptoCipher,
): Promise<Database> {
  reader.assertOpenedTagOf('KeePassFile');

  const database: Partial<Database> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Meta':
        if (database.metadata) {
          throw new Error('Multiple Meta elements');
        }

        database.metadata = await parseMetaTag(
          reader.readFromCurrent(),
          randomStream,
        );
        break;

      case 'Root': {
        if (database.rootGroup) {
          throw new Error('Multiple Root elements');
        }

        const { rootGroup, deletedObjects } = await parseRootTag(
          reader.readFromCurrent(),
          binaryPool,
          randomStream,
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
