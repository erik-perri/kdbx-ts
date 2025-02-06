import { type Element } from '@xmldom/xmldom';

import { type TimeInfo } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseTimesTag(
  reader: KdbxXmlReader,
  element: Element,
): TimeInfo {
  reader.assertTag(element, 'Times');

  const timeInfo: TimeInfo = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'LastModificationTime':
        timeInfo.lastModificationTime = reader.readDateTimeValue(child);
        break;

      case 'CreationTime':
        timeInfo.creationTime = reader.readDateTimeValue(child);
        break;

      case 'LastAccessTime':
        timeInfo.lastAccessTime = reader.readDateTimeValue(child);
        break;

      case 'ExpiryTime':
        timeInfo.expiryTime = reader.readDateTimeValue(child);
        break;

      case 'Expires':
        timeInfo.expires = reader.readBooleanValue(child);
        break;

      case 'UsageCount':
        timeInfo.usageCount = reader.readNumberValue(child);
        break;

      case 'LocationChanged':
        timeInfo.locationChanged = reader.readDateTimeValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  return timeInfo;
}
