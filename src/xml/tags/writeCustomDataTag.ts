import type CustomData from '../../types/database/CustomData';
import type CustomDataWithTimes from '../../types/database/CustomDataWithTimes';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeCustomDataTag(
  writer: KdbxXmlWriter,
  data: Record<string, CustomData | CustomDataWithTimes | undefined>,
  withTimes: boolean,
): void {
  writer.writeStartElement('CustomData');

  for (const item of Object.values(data)) {
    if (!item) {
      continue;
    }

    serializeCustomDataItemTag(writer, item, withTimes);
  }

  writer.writeEndElement();
}

function serializeCustomDataItemTag(
  writer: KdbxXmlWriter,
  data: CustomData | CustomDataWithTimes,
  withTimes: boolean,
): void {
  writer.writeStartElement('Item');

  writer.writeString('Key', data.key);
  writer.writeString('Value', data.value);

  if (
    withTimes &&
    isCustomDataWithTimes(data) &&
    data.lastModified !== undefined
  ) {
    writer.writeDateTime('Times', data.lastModified);
  }

  writer.writeEndElement();
}

function isCustomDataWithTimes(
  data: CustomData | CustomDataWithTimes,
): data is CustomDataWithTimes {
  return (data as CustomDataWithTimes).lastModified !== undefined;
}
