import createInnerStreamCipher from '../crypto/createInnerStreamCipher';
import { type CryptoImplementation } from '../crypto/types';
import type SymmetricCipherMode from '../enums/SymmetricCipherMode';
import type Database from '../structure/Database';
import { type KdbxBinaryPoolValue } from '../types';
import KdbxXmlReader from '../utilities/KdbxXmlReader';
import parseKeePassFileTag from './tags/parseKeePassFileTag';

export default async function readDatabaseXml(
  crypto: CryptoImplementation,
  binaryPool: KdbxBinaryPoolValue[] | undefined,
  streamCipherMode: SymmetricCipherMode,
  streamKey: Uint8Array,
  contents: string,
): Promise<Database> {
  const streamCipher = await createInnerStreamCipher(
    crypto,
    streamCipherMode,
    streamKey,
  );

  const reader = new KdbxXmlReader(contents, streamCipher, binaryPool ?? []);

  if (!reader.current.isMeta) {
    throw new Error('Invalid database format. No XML header found');
  }

  // Skip past the XML header
  reader.readNextStartElement();

  return await parseKeePassFileTag(reader);
}
