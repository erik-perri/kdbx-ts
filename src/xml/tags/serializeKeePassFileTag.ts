import type Database from '../../structure/Database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import serializeMetaTag from './serializeMetaTag';

export default async function serializeKeePassFileTag(
  writer: KdbxXmlWriter,
  database: Database,
): Promise<void> {
  writer.writeStartElement('KeePassFile');

  serializeMetaTag(writer, database.metadata);

  // TODO
  // serializeRootTag(writer, database.root);

  writer.writeEndElement();

  return Promise.resolve();
}
