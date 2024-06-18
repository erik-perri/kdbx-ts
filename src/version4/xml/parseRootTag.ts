import type DatabaseRoot from '../../structure/DatabaseRoot';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import type { BinaryPool } from '../types';
import parseDeletedObjectsTag from './parseDeletedObjectsTag';
import parseGroupTag from './parseGroupTag';

export default async function parseRootTag(
  reader: KdbxXmlReader,
  binaryPool: BinaryPool,
): Promise<DatabaseRoot> {
  reader.assertOpenedTagOf('Root');

  const result: Partial<DatabaseRoot> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Group':
        if (result.group) {
          throw new Error('Multiple root group elements');
        }

        result.group = await parseGroupTag(
          reader.readFromCurrent(),
          binaryPool,
        );
        break;

      case 'DeletedObjects':
        result.deletedObjects = await parseDeletedObjectsTag(
          reader.readFromCurrent(),
        );
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isDatabaseRootComplete(result)) {
    throw new Error('Incomplete "Root" element found');
  }

  return result;
}

function isDatabaseRootComplete(
  results: Partial<DatabaseRoot>,
): results is DatabaseRoot {
  return results.group !== undefined;
}
