import { type Element } from '@xmldom/xmldom';

import { type TimeInfo } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeTimesTag(
  writer: KdbxXmlWriter,
  times: TimeInfo,
): Element {
  const element = writer.createElement('Times');

  if (times.lastModificationTime !== undefined) {
    element.appendChild(
      writer.writeDateTime('LastModificationTime', times.lastModificationTime),
    );
  }

  if (times.creationTime !== undefined) {
    element.appendChild(
      writer.writeDateTime('CreationTime', times.creationTime),
    );
  }

  if (times.lastAccessTime !== undefined) {
    element.appendChild(
      writer.writeDateTime('LastAccessTime', times.lastAccessTime),
    );
  }

  if (times.expiryTime !== undefined) {
    element.appendChild(writer.writeDateTime('ExpiryTime', times.expiryTime));
  }

  if (times.expires !== undefined) {
    element.appendChild(writer.writeBoolean('Expires', times.expires));
  }

  if (times.usageCount !== undefined) {
    element.appendChild(writer.writeNumber('UsageCount', times.usageCount));
  }

  if (times.locationChanged !== undefined) {
    element.appendChild(
      writer.writeDateTime('LocationChanged', times.locationChanged),
    );
  }

  return element;
}
