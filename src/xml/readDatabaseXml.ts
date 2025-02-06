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
  const parser = KdbxXmlReader.create(contents, streamCipher, binaryPool);

  return await parseKeePassFileTag(parser);
}
