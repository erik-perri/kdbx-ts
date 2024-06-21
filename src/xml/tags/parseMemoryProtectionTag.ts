import type MemoryProtection from '../../structure/MemoryProtection';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseMemoryProtectionTag(
  reader: KdbxXmlReader,
): MemoryProtection {
  reader.assertOpenedTagOf('MemoryProtection');

  const memoryProtection: MemoryProtection = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'ProtectTitle':
        memoryProtection.protectTitle = reader.readBooleanValue();
        break;

      case 'ProtectUserName':
        memoryProtection.protectUserName = reader.readBooleanValue();
        break;

      case 'ProtectPassword':
        memoryProtection.protectPassword = reader.readBooleanValue();
        break;

      case 'ProtectURL':
        memoryProtection.protectURL = reader.readBooleanValue();
        break;

      case 'ProtectNotes':
        memoryProtection.protectNotes = reader.readBooleanValue();
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  return memoryProtection;
}
