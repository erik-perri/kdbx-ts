import type { CryptoCipher } from '../crypto/types';
import type Database from '../structure/Database';
import type { KdbxBinaryPoolValue } from '../types';
import KdbxXmlWriter from '../utilities/KdbxXmlWriter';
import writeKeePassFileTag from './tags/writeKeePassFileTag';

export default async function serializeDatabaseXml(
  database: Database,
  binaryPool: KdbxBinaryPoolValue[] | undefined,
  streamCipher: CryptoCipher,
): Promise<string> {
  const writer = new KdbxXmlWriter(streamCipher, binaryPool ?? []);

  writer.writeStartDocument('1.0', true);

  await writeKeePassFileTag(writer, database);

  writer.writeEndDocument();

  return writer.contents + writer.lineSeparator;
}
