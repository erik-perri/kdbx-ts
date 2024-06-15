import type DeletedObject from '../../structure/DeletedObject';
import type Group from '../../structure/Group';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import type { BinaryPool } from '../types';
import parseDeletedObjectsTag from './parseDeletedObjectsTag';
import parseGroupTag from './parseGroupTag';

type RootTagParseResults = {
  rootGroup: Group;
  deletedObjects: DeletedObject[];
};

function isRootTagParseResultsComplete(
  results: Partial<RootTagParseResults>,
): results is RootTagParseResults {
  return (
    results.rootGroup !== undefined && results.deletedObjects !== undefined
  );
}

export default async function parseRootTag(
  reader: KdbxXmlReader,
  binaryPool: BinaryPool,
): Promise<RootTagParseResults> {
  reader.assertOpenedTagOf('Root');

  const result: Partial<RootTagParseResults> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Group':
        if (result.rootGroup) {
          throw new Error('Multiple root group elements');
        }

        result.rootGroup = await parseGroupTag(
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

  if (!isRootTagParseResultsComplete(result)) {
    throw new Error('Incomplete "Root" element found');
  }

  return result;
}
