import type DeletedObject from '../../structure/DeletedObject';
import { type XmlReader } from '../../utilities/XmlReader';
import parseDeletedObjectTag from './parseDeletedObjectTag';

export default async function parseDeletedObjectsTag(
  reader: XmlReader,
): Promise<DeletedObject[]> {
  reader.assertOpenedTagOf('DeletedObjects');

  const objects: DeletedObject[] = [];

  // If we're a close tag, we don't need to do anything
  if (reader.current.isClose) {
    return objects;
  }

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'DeletedObject':
        objects.push(await parseDeletedObjectTag(reader.readFromCurrent()));
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  return objects;
}
