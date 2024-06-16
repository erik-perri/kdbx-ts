import type TimeInfo from '../../structure/TimeInfo';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseTimesTag(reader: KdbxXmlReader): TimeInfo {
  reader.assertOpenedTagOf('Times');

  const timeInfo: Partial<TimeInfo> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'LastModificationTime':
        timeInfo.lastModificationTime = reader.readDateTimeValue();
        break;

      case 'CreationTime':
        timeInfo.creationTime = reader.readDateTimeValue();
        break;

      case 'LastAccessTime':
        timeInfo.lastAccessTime = reader.readDateTimeValue();
        break;

      case 'ExpiryTime':
        timeInfo.expiryTime = reader.readDateTimeValue();
        break;

      case 'Expires':
        timeInfo.expires = reader.readBooleanValue();
        break;

      case 'UsageCount':
        timeInfo.usageCount = reader.readNumberValue();
        break;

      case 'LocationChanged':
        timeInfo.locationChanged = reader.readDateTimeValue();
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isTimeInfoComplete(timeInfo)) {
    throw new Error('Time info is incomplete');
  }

  return timeInfo;
}

function isTimeInfoComplete(item: Partial<TimeInfo>): item is TimeInfo {
  return (
    item.creationTime !== undefined &&
    item.expires !== undefined &&
    item.expiryTime !== undefined &&
    item.lastAccessTime !== undefined &&
    item.lastModificationTime !== undefined &&
    item.locationChanged !== undefined &&
    item.usageCount !== undefined
  );
}
