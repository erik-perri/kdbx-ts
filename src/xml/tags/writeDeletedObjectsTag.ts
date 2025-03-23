import type { Element } from '@xmldom/xmldom';

import { type DeletedObject } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeDeletedObjectsTag(
  writer: KdbxXmlWriter,
  deletedObjects: DeletedObject[],
): Element {
  const element = writer.createElement('DeletedObjects');

  for (const deletedObject of deletedObjects) {
    element.appendChild(writeDeletedObjectTag(writer, deletedObject));
  }

  return element;
}

function writeDeletedObjectTag(
  writer: KdbxXmlWriter,
  deletedObject: DeletedObject,
): Element {
  const element = writer.createElement('DeletedObject');

  element.appendChild(writer.writeUuid('UUID', deletedObject.uuid, true));
  element.appendChild(
    writer.writeDateTime('DeletionTime', deletedObject.deletionTime),
  );

  return element;
}
