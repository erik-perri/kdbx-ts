import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

type StringTagData = {
  key: string;
  value: string;
  isProtected: boolean;
};

export default async function parseEntryStringTag(
  reader: KdbxXmlReader,
): Promise<StringTagData> {
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
