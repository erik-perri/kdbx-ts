import type Icon from '../../types/database/Icon';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default async function parseIconTag(
  reader: KdbxXmlReader,
): Promise<Icon> {
  reader.assertOpenedTagOf('Icon');

  const icon: Partial<Icon> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'UUID':
        icon.uuid = await reader.readUuidValue();
        break;

      case 'Data':
        icon.data = await reader.readBinaryValue();
        break;

      case 'Name':
        icon.name = reader.readStringValue();
        break;

      case 'LastModificationTime':
        icon.lastModificationTime = reader.readDateTimeValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Icon"`,
        );
    }
  }

  if (!isIconComplete(icon)) {
    throw new Error('Found "Icon" tag with incomplete data');
  }

  return icon;
}

function isIconComplete(icon: Partial<Icon>): icon is Icon {
  return icon.data !== undefined && icon.uuid !== undefined;
}
