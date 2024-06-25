import { type CryptoCipher } from '../crypto/types';
import { type KdbxBinaryPoolValue } from '../types';
import type Database from '../types/Database';
import KdbxXmlReader from '../utilities/KdbxXmlReader';
import parseKeePassFileTag from './tags/parseKeePassFileTag';

export default async function readDatabaseXml(
  contents: string,
  binaryPool: KdbxBinaryPoolValue[] | undefined,
  streamCipher: CryptoCipher,
): Promise<Database> {
  const reader = new KdbxXmlReader(contents, streamCipher, binaryPool ?? []);

  if (!reader.current.isMeta) {
    throw new Error('Invalid database format. No XML header found');
  }

  // Skip past the XML header
  reader.readNextStartElement();

  return await parseKeePassFileTag(reader);
}
