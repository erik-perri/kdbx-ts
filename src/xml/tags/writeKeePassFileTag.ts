import type Database from '../../structure/Database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeMetaTag from './writeMetaTag';
import writeRootTag from './writeRootTag';

export default async function writeKeePassFileTag(
  writer: KdbxXmlWriter,
  database: Database,
): Promise<void> {
  writer.writeStartElement('KeePassFile');

  writeMetaTag(writer, database.metadata);
  await writeRootTag(writer, database.root);

  writer.writeEndElement();
}
