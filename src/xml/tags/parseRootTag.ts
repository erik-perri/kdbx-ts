import { type DatabaseRoot } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseDeletedObjectsTag from './parseDeletedObjectsTag';
import parseGroupTag from './parseGroupTag';

export default async function parseRootTag(
  reader: KdbxXmlReader,
): Promise<DatabaseRoot> {
  reader.expect('Root');

  const result: Partial<DatabaseRoot> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Group':
        result.group = await parseGroupTag(element);
        break;

      case 'DeletedObjects':
        result.deletedObjects = await parseDeletedObjectsTag(element);
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (!isDatabaseRootComplete(result)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return result;
}

function isDatabaseRootComplete(
  results: Partial<DatabaseRoot>,
): results is DatabaseRoot {
  return results.group !== undefined;
}
