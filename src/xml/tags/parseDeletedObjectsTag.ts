import { type DeletedObject } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseDeletedObjectsTag(
  reader: KdbxXmlReader,
): Promise<DeletedObject[]> {
  reader.expect('DeletedObjects');

  const objects: DeletedObject[] = [];

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'DeletedObject':
        objects.push(await parseDeletedObjectTag(element));
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  return objects;
}

async function parseDeletedObjectTag(
  reader: KdbxXmlReader,
): Promise<DeletedObject> {
  reader.expect('DeletedObject');

  const deleted: Partial<DeletedObject> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'UUID':
        deleted.uuid = await element.readUuidValue();
        break;

      case 'DeletionTime':
        deleted.deletionTime = element.readDateTimeValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (!isDeletedObjectComplete(deleted)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
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
