import type Icon from '../../structure/Icon';
import { isIconComplete } from '../../structure/utilities';
import type { XmlReader } from '../../utilities/XmlReader';
import readBinaryValue from './readBinaryValue';
import readDateTimeValue from './readDateTimeValue';
import readStringValue from './readStringValue';
import readUuidValue from './readUuidValue';

export default async function parseIconTag(reader: XmlReader): Promise<Icon> {
  reader.assertOpenedTagOf('Icon');

  const icon: Partial<Icon> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'UUID':
        icon.uuid = await readUuidValue(reader);
        break;

      case 'Data':
        icon.data = await readBinaryValue(reader);
        break;

      case 'Name':
        icon.name = readStringValue(reader);
        break;

      case 'LastModificationTime':
        icon.lastModificationTime = readDateTimeValue(reader);
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
