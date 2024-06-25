import { type DeletedObject } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeDeletedObjectsTag(
  writer: KdbxXmlWriter,
  deletedObjects: DeletedObject[],
): void {
  writer.writeStartElement('DeletedObjects');

  for (const deletedObject of deletedObjects) {
    writeDeletedObjectTag(writer, deletedObject);
  }

  writer.writeEndElement();
}

function writeDeletedObjectTag(
  writer: KdbxXmlWriter,
  deletedObject: DeletedObject,
): void {
  writer.writeStartElement('DeletedObject');

  writer.writeUuid('UUID', deletedObject.uuid, true);
  writer.writeDateTime('DeletionTime', deletedObject.deletionTime);

  writer.writeEndElement();
}
