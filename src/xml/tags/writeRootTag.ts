import { type Element } from '@xmldom/xmldom';

import { type DatabaseRoot } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeDeletedObjectsTag from './writeDeletedObjectsTag';
import writeGroupTag from './writeGroupTag';

export default async function writeRootTag(
  writer: KdbxXmlWriter,
  root: DatabaseRoot,
): Promise<Element> {
  const element = writer.createElement('Root');

  element.appendChild(await writeGroupTag(writer, root.group));

  if (root.deletedObjects !== undefined) {
    element.appendChild(writeDeletedObjectsTag(writer, root.deletedObjects));
  }

  return element;
}
