import { type Icon } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseIconTag(
  reader: KdbxXmlReader,
): Promise<Icon> {
  reader.expect('Icon');

  const icon: Partial<Icon> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'UUID':
        icon.uuid = await element.readUuidValue();
        break;

      case 'Data':
        icon.data = await element.readBinaryValue();
        break;

      case 'Name':
        icon.name = element.readStringValue();
        break;

      case 'LastModificationTime':
        icon.lastModificationTime = element.readDateTimeValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (!isIconComplete(icon)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return icon;
}

function isIconComplete(icon: Partial<Icon>): icon is Icon {
  return icon.data !== undefined && icon.uuid !== undefined;
}
