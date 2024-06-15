import type CustomDataItem from '../../structure/CustomDateTime';
import { isCustomDataItemComplete } from '../../structure/utilities';
import type { XmlReader } from '../../utilities/XmlReader';
import readDateTimeValue from './readDateTimeValue';
import readStringValue from './readStringValue';

export default function parseCustomDataItemTag(
  reader: XmlReader,
): CustomDataItem {
  reader.assertOpenedTagOf('Item');

  const customData: Partial<CustomDataItem> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Key':
        customData.key = readStringValue(reader);
        break;

      case 'Value':
        customData.value = readStringValue(reader);
        break;

      case 'LastModificationTime':
        customData.lastModified = readDateTimeValue(reader);
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isCustomDataItemComplete(customData)) {
    throw new Error('Custom data item is incomplete');
  }

  return customData;
}
