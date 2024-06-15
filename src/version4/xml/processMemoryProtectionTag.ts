import type Metadata from '../../structure/Metadata';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function processMemoryProtectionTag(
  reader: KdbxXmlReader,
  metadata: Partial<Metadata>,
): void {
  reader.assertOpenedTagOf('MemoryProtection');

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'ProtectTitle':
        metadata.protectTitle = reader.readBooleanValue();
        break;

      case 'ProtectUserName':
        metadata.protectUserName = reader.readBooleanValue();
        break;

      case 'ProtectPassword':
        metadata.protectPassword = reader.readBooleanValue();
        break;

      case 'ProtectURL':
        metadata.protectURL = reader.readBooleanValue();
        break;

      case 'ProtectNotes':
        metadata.protectNotes = reader.readBooleanValue();
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }
}
