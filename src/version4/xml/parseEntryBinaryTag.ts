import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

type BinaryTagData = {
  key: string;
  ref: string;
};

export default function parseEntryBinaryTag(
  reader: KdbxXmlReader,
): BinaryTagData {
  reader.assertOpenedTagOf('Binary');

  const result: Partial<BinaryTagData> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Key':
        result.key = reader.readStringValue();
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

function isBinaryTagDataComplete(
  data: Partial<BinaryTagData>,
): data is BinaryTagData {
  return data.key !== undefined && data.ref !== undefined;
}
