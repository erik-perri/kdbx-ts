import { DOMImplementation, XMLSerializer } from '@xmldom/xmldom';

import { type SymmetricCipher } from '../dependencies';
import { type Database } from '../types/database';
import type { KdbxBinaryPoolValue } from '../types/format';
import KdbxXmlWriter from '../utilities/KdbxXmlWriter';
import writeKeePassFileTag from './tags/writeKeePassFileTag';

export default async function serializeDatabaseXml(
  database: Database,
  binaryPool: KdbxBinaryPoolValue[] | undefined,
  streamCipher: SymmetricCipher,
): Promise<string> {
  const document = new DOMImplementation().createDocument('', '', null);
  const writer = new KdbxXmlWriter(document, binaryPool, streamCipher);

  const root = await writeKeePassFileTag(writer, database);

  document.appendChild(root);

  const serialized = new XMLSerializer().serializeToString(document);

  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    serialized +
    '\n'
  );
}
