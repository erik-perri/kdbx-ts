import { type MemoryProtection } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseMemoryProtectionTag(
  reader: KdbxXmlReader,
): MemoryProtection {
  reader.expect('MemoryProtection');

  const memoryProtection: MemoryProtection = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'ProtectTitle':
        memoryProtection.protectTitle = element.readBooleanValue();
        break;

      case 'ProtectUserName':
        memoryProtection.protectUserName = element.readBooleanValue();
        break;

      case 'ProtectPassword':
        memoryProtection.protectPassword = element.readBooleanValue();
        break;

      case 'ProtectURL':
        memoryProtection.protectURL = element.readBooleanValue();
        break;

      case 'ProtectNotes':
        memoryProtection.protectNotes = element.readBooleanValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  return memoryProtection;
}
