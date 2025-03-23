import { type Element } from '@xmldom/xmldom';

import { type Database } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeMetaTag from './writeMetaTag';
import writeRootTag from './writeRootTag';

export default async function writeKeePassFileTag(
  writer: KdbxXmlWriter,
  database: Database,
): Promise<Element> {
  const keePassFile = writer.createElement('KeePassFile');

  keePassFile.appendChild(writeMetaTag(writer, database.metadata));
  keePassFile.appendChild(await writeRootTag(writer, database.root));

  return keePassFile;
}
