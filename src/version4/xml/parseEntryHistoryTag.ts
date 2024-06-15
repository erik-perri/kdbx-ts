import type { CryptoCipher } from '../../crypto/types';
import type Entry from '../../structure/Entry';
import { type XmlReader } from '../../utilities/XmlReader';
import type { BinaryPool } from '../types';
import parseEntryTag from './parseEntryTag';

export default async function parseEntryHistoryTag(
  reader: XmlReader,
  binaryPool: BinaryPool,
  randomStream: CryptoCipher,
): Promise<Entry[]> {
  reader.assertOpenedTagOf('History');

  const history: Entry[] = [];

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Entry':
        history.push(
          await parseEntryTag(
            reader.readFromCurrent(),
            binaryPool,
            randomStream,
            true,
          ),
        );
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  return history;
}
