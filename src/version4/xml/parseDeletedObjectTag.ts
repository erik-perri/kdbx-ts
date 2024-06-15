import type DeletedObject from '../../structure/DeletedObject';
import { isDeletedObjectComplete } from '../../structure/utilities';
import { type XmlReader } from '../../utilities/XmlReader';
import readDateTimeValue from './readDateTimeValue';
import readUuidValue from './readUuidValue';

export default async function parseDeletedObjectTag(
  reader: XmlReader,
): Promise<DeletedObject> {
  reader.assertOpenedTagOf('DeletedObject');

  const deleted: Partial<DeletedObject> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'UUID':
        deleted.uuid = await readUuidValue(reader);
        break;

      case 'DeletionTime':
        deleted.deletionTime = readDateTimeValue(reader);
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
