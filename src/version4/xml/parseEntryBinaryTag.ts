import type { XmlReader } from '../../utilities/XmlReader';
import readStringValue from './readStringValue';

type BinaryTagData = {
  key: string;
  ref: string;
};

function isBinaryTagDataComplete(
  data: Partial<BinaryTagData>,
): data is BinaryTagData {
  return data.key !== undefined && data.ref !== undefined;
}

export default function parseEntryBinaryTag(reader: XmlReader): BinaryTagData {
  reader.assertOpenedTagOf('Binary');

  const result: Partial<BinaryTagData> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Key':
        result.key = readStringValue(reader);
        break;

      case 'Value':
        if (reader.current.attributes.Ref === undefined) {
          throw new Error('Inline Binary not implemented');
        }

        result.ref = reader.current.attributes.Ref;
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isBinaryTagDataComplete(result)) {
    throw new Error('Binary tag data is incomplete');
  }

  return result;
}
