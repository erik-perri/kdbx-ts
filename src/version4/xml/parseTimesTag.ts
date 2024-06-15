import type TimeInfo from '../../structure/TimeInfo';
import { isTimeInfoComplete } from '../../structure/utilities';
import { type XmlReader } from '../../utilities/XmlReader';
import readBooleanValue from './readBooleanValue';
import readDateTimeValue from './readDateTimeValue';
import readNumberValue from './readNumberValue';

export default function parseTimesTag(reader: XmlReader): TimeInfo {
  reader.assertOpenedTagOf('Times');

  const timeInfo: Partial<TimeInfo> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'LastModificationTime':
        timeInfo.lastModificationTime = readDateTimeValue(reader);
        break;

      case 'CreationTime':
        timeInfo.creationTime = readDateTimeValue(reader);
        break;

      case 'LastAccessTime':
        timeInfo.lastAccessTime = readDateTimeValue(reader);
        break;

      case 'ExpiryTime':
        timeInfo.expiryTime = readDateTimeValue(reader);
        break;

      case 'Expires':
        timeInfo.expires = readBooleanValue(reader);
        break;

      case 'UsageCount':
        timeInfo.usageCount = readNumberValue(reader);
        break;

      case 'LocationChanged':
        timeInfo.locationChanged = readDateTimeValue(reader);
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
