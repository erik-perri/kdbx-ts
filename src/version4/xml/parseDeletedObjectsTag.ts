import type DeletedObject from '../../structure/DeletedObject';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseDeletedObjectsTag(
  reader: KdbxXmlReader,
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

async function parseDeletedObjectTag(
  reader: KdbxXmlReader,
): Promise<DeletedObject> {
  reader.assertOpenedTagOf('DeletedObject');

  const deleted: Partial<DeletedObject> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'UUID':
        deleted.uuid = await reader.readUuidValue();
        break;

      case 'DeletionTime':
        deleted.deletionTime = reader.readDateTimeValue();
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isDeletedObjectComplete(deleted)) {
    throw new Error('Deleted object is incomplete');
  }

  return deleted;
}

function isDeletedObjectComplete(
  deletedObject: Partial<DeletedObject>,
): deletedObject is DeletedObject {
  return (
    deletedObject.uuid !== undefined && deletedObject.deletionTime !== undefined
  );
}
