import type TimeInfo from '../../types/database/TimeInfo';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeTimesTag(
  writer: KdbxXmlWriter,
  times: TimeInfo,
): void {
  writer.writeStartElement('Times');

  if (times.lastModificationTime !== undefined) {
    writer.writeDateTime('LastModificationTime', times.lastModificationTime);
  }

  if (times.creationTime !== undefined) {
    writer.writeDateTime('CreationTime', times.creationTime);
  }

  if (times.lastAccessTime !== undefined) {
    writer.writeDateTime('LastAccessTime', times.lastAccessTime);
  }

  if (times.expiryTime !== undefined) {
    writer.writeDateTime('ExpiryTime', times.expiryTime);
  }

  if (times.expires !== undefined) {
    writer.writeBoolean('Expires', times.expires);
  }

  if (times.usageCount !== undefined) {
    writer.writeNumber('UsageCount', times.usageCount);
  }

  if (times.locationChanged !== undefined) {
    writer.writeDateTime('LocationChanged', times.locationChanged);
  }

  writer.writeEndElement();
}
