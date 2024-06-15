import type { CryptoCipher } from '../../crypto/types';
import type Database from '../../structure/Database';
import Uint8ArrayReader from '../../utilities/Uint8ArrayReader';
import { XmlReader } from '../../utilities/XmlReader';
import { type BinaryPool } from '../types';
import parseKeePassFileTag from './parseKeePassFileTag';

export default async function parseDatabaseXml(
  xml: Uint8Array,
  binaryPool: BinaryPool,
  randomStream: CryptoCipher,
): Promise<Database> {
  const xmlAsString = Uint8ArrayReader.toString(xml);
  const reader = new XmlReader(xmlAsString);

  if (!reader.current.isMeta) {
    throw new Error('Unexpected database format, no XML header');
  }

  // Skip past the XML header
  reader.readNextStartElement();

  return await parseKeePassFileTag(reader, binaryPool, randomStream);
}
