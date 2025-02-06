import { type EntryAttribute } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseEntryStringTag(
  reader: KdbxXmlReader,
): Promise<EntryAttribute> {
  reader.expect('String');

  let key: string | undefined;
  let value: string | undefined;
  let isProtected: boolean | undefined;

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Key':
        key = element.readStringValue();
        break;

      case 'Value':
        [value, isProtected] =
          await element.readPotentiallyProtectedStringValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (key === undefined || value === undefined) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return {
    isProtected: isProtected ?? false,
    key,
    value,
  };
}
