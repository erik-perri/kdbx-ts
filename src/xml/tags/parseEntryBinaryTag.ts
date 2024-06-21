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
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Binary"`,
        );
    }
  }

  if (!isBinaryTagDataComplete(result)) {
    throw new Error('Found "Binary" tag with incomplete data');
  }

  return result;
}

function isBinaryTagDataComplete(
  data: Partial<BinaryTagData>,
): data is BinaryTagData {
  return data.key !== undefined && data.ref !== undefined;
}
