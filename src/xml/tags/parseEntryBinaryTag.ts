import { type Element } from '@xmldom/xmldom';

import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

type BinaryTagData = {
  key: string;
  ref: string;
};

export default function parseEntryBinaryTag(
  reader: KdbxXmlReader,
  element: Element,
): BinaryTagData {
  reader.assertTag(element, 'Binary');

  const result: Partial<BinaryTagData> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Key':
        result.key = reader.readStringValue(child);
        break;

      case 'Value':
        if (reader.attribute(child, 'Ref') === undefined) {
          // TODO Find out if this is possible on v4+ and change this message if not
          throw new Error('Inline Binary not implemented');
        }

        result.ref = reader.attribute(child, 'Ref');
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (!isBinaryTagDataComplete(result)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return result;
}

function isBinaryTagDataComplete(
  data: Partial<BinaryTagData>,
): data is BinaryTagData {
  return data.key !== undefined && data.ref !== undefined;
}
