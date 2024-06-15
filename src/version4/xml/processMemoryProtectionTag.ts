import type Metadata from '../../structure/Metadata';
import { type XmlReader } from '../../utilities/XmlReader';
import readBooleanValue from './readBooleanValue';

export default function processMemoryProtectionTag(
  reader: XmlReader,
  metadata: Partial<Metadata>,
): void {
  reader.assertOpenedTagOf('MemoryProtection');

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'ProtectTitle':
        metadata.protectTitle = readBooleanValue(reader);
        break;

      case 'ProtectUserName':
        metadata.protectUserName = readBooleanValue(reader);
        break;

      case 'ProtectPassword':
        metadata.protectPassword = readBooleanValue(reader);
        break;

      case 'ProtectURL':
        metadata.protectURL = readBooleanValue(reader);
        break;

      case 'ProtectNotes':
        metadata.protectNotes = readBooleanValue(reader);
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }
}
