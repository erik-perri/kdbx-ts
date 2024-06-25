import { type EntryAttribute } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseEntryStringTag(
  reader: KdbxXmlReader,
): Promise<EntryAttribute> {
  reader.assertOpenedTagOf('String');

  let key: string | undefined;
  let value: string | undefined;
  let isProtected: boolean | undefined;

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Key':
        key = reader.readStringValue();
        break;

      case 'Value':
        [value, isProtected] =
          await reader.readPotentiallyProtectedStringValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "String"`,
        );
    }
  }

  if (key === undefined || value === undefined) {
    throw new Error('Found "String" tag with incomplete data');
  }

  return {
    isProtected: isProtected ?? false,
    key,
    value,
  };
}
