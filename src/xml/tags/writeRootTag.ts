import { type DatabaseRoot } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeDeletedObjectsTag from './writeDeletedObjectsTag';
import writeGroupTag from './writeGroupTag';

export default async function writeRootTag(
  writer: KdbxXmlWriter,
  root: DatabaseRoot,
): Promise<void> {
  writer.writeStartElement('Root');

  await writeGroupTag(writer, root.group);

  if (root.deletedObjects !== undefined) {
    writeDeletedObjectsTag(writer, root.deletedObjects);
  }

  writer.writeEndElement();
}
