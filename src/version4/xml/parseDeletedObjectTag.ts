import type DeletedObject from '../../structure/DeletedObject';
import { isDeletedObjectComplete } from '../../structure/utilities';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseDeletedObjectTag(
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
