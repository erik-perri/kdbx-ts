import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

type BinaryTagData = {
  key: string;
  ref: string;
};

export default function parseEntryBinaryTag(
  reader: KdbxXmlReader,
): BinaryTagData {
  reader.expect('Binary');

  const result: Partial<BinaryTagData> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Key':
        result.key = element.readStringValue();
        break;

      case 'Value':
        if (element.attribute('Ref') === undefined) {
          // TODO Find out if this is possible on v4+ and change this message if not
          throw new Error('Inline Binary not implemented');
        }

        result.ref = element.attribute('Ref');
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (!isBinaryTagDataComplete(result)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return result;
}

function isBinaryTagDataComplete(
  data: Partial<BinaryTagData>,
): data is BinaryTagData {
  return data.key !== undefined && data.ref !== undefined;
}
