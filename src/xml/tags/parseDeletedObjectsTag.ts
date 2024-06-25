import type DeletedObject from '../../types/database/DeletedObject';
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
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "DeletedObjects"`,
        );
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
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "DeletedObject"`,
        );
    }
  }

  if (!isDeletedObjectComplete(deleted)) {
    throw new Error('Found "DeletedObject" tag with incomplete data');
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
