import type { Element } from '@xmldom/xmldom';

import { type MemoryProtection } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseMemoryProtectionTag(
  reader: KdbxXmlReader,
  element: Element,
): MemoryProtection {
  reader.assertTag(element, 'MemoryProtection');

  const memoryProtection: MemoryProtection = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'ProtectTitle':
        memoryProtection.protectTitle = reader.readBooleanValue(child);
        break;

      case 'ProtectUserName':
        memoryProtection.protectUserName = reader.readBooleanValue(child);
        break;

      case 'ProtectPassword':
        memoryProtection.protectPassword = reader.readBooleanValue(child);
        break;

      case 'ProtectURL':
        memoryProtection.protectURL = reader.readBooleanValue(child);
        break;

      case 'ProtectNotes':
        memoryProtection.protectNotes = reader.readBooleanValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  return memoryProtection;
}
