import { DOMParser } from '@xmldom/xmldom';

import { type SymmetricCipher } from '../dependencies';
import { type Database } from '../types/database';
import { type KdbxBinaryPoolValue } from '../types/format';
import KdbxXmlReader from '../utilities/KdbxXmlReader';
import parseKeePassFileTag from './tags/parseKeePassFileTag';

export default async function readDatabaseXml(
  contents: string,
  binaryPool: KdbxBinaryPoolValue[] | undefined,
  streamCipher: SymmetricCipher,
): Promise<Database> {
  const document = new DOMParser().parseFromString(contents, 'text/xml');

  if (!document.documentElement) {
    throw new Error('Document has no root element.');
  }

  const reader = new KdbxXmlReader(streamCipher, binaryPool);

  return await parseKeePassFileTag(reader, document.documentElement);
}
