import type DatabaseRoot from '../../types/database/DatabaseRoot';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseDeletedObjectsTag from './parseDeletedObjectsTag';
import parseGroupTag from './parseGroupTag';

export default async function parseRootTag(
  reader: KdbxXmlReader,
): Promise<DatabaseRoot> {
  reader.assertOpenedTagOf('Root');

  const result: Partial<DatabaseRoot> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Group':
        if (result.group) {
          throw new Error('Multiple root group elements');
        }

        result.group = await parseGroupTag(reader.readFromCurrent());
        break;

      case 'DeletedObjects':
        result.deletedObjects = await parseDeletedObjectsTag(
          reader.readFromCurrent(),
        );
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Root"`,
        );
    }
  }

  if (!isDatabaseRootComplete(result)) {
    throw new Error('Found "Root" tag with incomplete data');
  }

  return result;
}

function isDatabaseRootComplete(
  results: Partial<DatabaseRoot>,
): results is DatabaseRoot {
  return results.group !== undefined;
}
