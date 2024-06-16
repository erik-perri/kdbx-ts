import type { CryptoCipher } from '../../crypto/types';
import type Database from '../../structure/Database';
import KdbxXmlReader from '../../utilities/KdbxXmlReader';
import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';
import { type BinaryPool } from '../types';
import parseKeePassFileTag from './parseKeePassFileTag';

export default async function parseDatabaseXml(
  xml: Uint8Array,
  binaryPool: BinaryPool,
  randomStream: CryptoCipher,
): Promise<Database> {
  const xmlAsString = Uint8ArrayHelper.toString(xml);
  const reader = new KdbxXmlReader(xmlAsString, randomStream);

  if (!reader.current.isMeta) {
    throw new Error('Invalid database format. No XML header found');
  }

  // Skip past the XML header
  reader.readNextStartElement();

  return await parseKeePassFileTag(reader, binaryPool);
}
