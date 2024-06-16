import type Icon from '../../structure/Icon';
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
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isIconComplete(icon)) {
    throw new Error('Icon is incomplete');
  }

  return icon;
}

function isIconComplete(icon: Partial<Icon>): icon is Icon {
  return (
    icon.data !== undefined &&
    icon.lastModificationTime !== undefined &&
    icon.name !== undefined &&
    icon.uuid !== undefined
  );
}
