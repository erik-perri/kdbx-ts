import { type TimeInfo } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseTimesTag(reader: KdbxXmlReader): TimeInfo {
  reader.expect('Times');

  const timeInfo: TimeInfo = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'LastModificationTime':
        timeInfo.lastModificationTime = element.readDateTimeValue();
        break;

      case 'CreationTime':
        timeInfo.creationTime = element.readDateTimeValue();
        break;

      case 'LastAccessTime':
        timeInfo.lastAccessTime = element.readDateTimeValue();
        break;

      case 'ExpiryTime':
        timeInfo.expiryTime = element.readDateTimeValue();
        break;

      case 'Expires':
        timeInfo.expires = element.readBooleanValue();
        break;

      case 'UsageCount':
        timeInfo.usageCount = element.readNumberValue();
        break;

      case 'LocationChanged':
        timeInfo.locationChanged = element.readDateTimeValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  return timeInfo;
}
