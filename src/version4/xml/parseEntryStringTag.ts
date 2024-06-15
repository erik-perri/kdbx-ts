import type { CryptoCipher } from '../../crypto/types';
import type { XmlReader } from '../../utilities/XmlReader';
import readPotentiallyProtectedStringValue from './readPotentiallyProtectedStringValue';
import readStringValue from './readStringValue';

type StringTagData = {
  key: string;
  value: string;
  isProtected: boolean;
};

export default async function parseEntryStringTag(
  reader: XmlReader,
  randomStream: CryptoCipher,
): Promise<StringTagData> {
  reader.assertOpenedTagOf('String');

  let key: string | undefined;
  let value: string | undefined;
  let isProtected: boolean | undefined;

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Key':
        key = readStringValue(reader);
        break;

      case 'Value':
        [value, isProtected] = await readPotentiallyProtectedStringValue(
          reader,
          randomStream,
        );
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (key === undefined || value === undefined) {
    throw new Error('Entry string key or value missing');
  }

  return {
    isProtected: isProtected ?? false,
    key,
    value,
  };
}
