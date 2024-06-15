import type CustomDataItem from '../../structure/CustomDateTime';
import { isCustomDataItemComplete } from '../../structure/utilities';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseCustomDataItemTag(
  reader: KdbxXmlReader,
): CustomDataItem {
  reader.assertOpenedTagOf('Item');

  const customData: Partial<CustomDataItem> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Key':
        customData.key = reader.readStringValue();
        break;

      case 'Value':
        customData.value = reader.readStringValue();
        break;

      case 'LastModificationTime':
        customData.lastModified = reader.readDateTimeValue();
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
