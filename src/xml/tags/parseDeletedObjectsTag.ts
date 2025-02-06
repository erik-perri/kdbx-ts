import { type Element } from '@xmldom/xmldom';

import { type DeletedObject } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseDeletedObjectsTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<DeletedObject[]> {
  reader.assertTag(element, 'DeletedObjects');

  const objects: DeletedObject[] = [];

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'DeletedObject':
        objects.push(await parseDeletedObjectTag(reader, child));
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  return objects;
}

async function parseDeletedObjectTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<DeletedObject> {
  reader.assertTag(element, 'DeletedObject');

  const deleted: Partial<DeletedObject> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'UUID':
        deleted.uuid = await reader.readUuidValue(child);
        break;

      case 'DeletionTime':
        deleted.deletionTime = reader.readDateTimeValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (!isDeletedObjectComplete(deleted)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
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
