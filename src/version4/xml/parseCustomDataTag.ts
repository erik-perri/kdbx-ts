import type CustomDataItem from '../../structure/CustomDateTime';
import type { XmlReader } from '../../utilities/XmlReader';
import parseCustomDataItemTag from './parseCustomDataItemTag';

export default function parseCustomDataTag(
  reader: XmlReader,
): Record<string, CustomDataItem | undefined> {
  reader.assertOpenedTagOf('CustomData');

  const customData: Record<string, CustomDataItem | undefined> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Item': {
        const item = parseCustomDataItemTag(reader.readFromCurrent());

        if (!item.key || !item.value) {
          throw new Error('Missing custom data key or value');
        }

        customData[item.key] = item;
        break;
      }

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  return customData;
}
