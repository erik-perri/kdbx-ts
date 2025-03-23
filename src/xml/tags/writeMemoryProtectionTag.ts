import { type Element } from '@xmldom/xmldom';

import { type MemoryProtection } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeMemoryProtectionTag(
  writer: KdbxXmlWriter,
  memoryProtection: MemoryProtection,
): Element {
  const element = writer.createElement('MemoryProtection');

  if (memoryProtection.protectTitle !== undefined) {
    element.appendChild(
      writer.writeBoolean('ProtectTitle', memoryProtection.protectTitle),
    );
  }

  if (memoryProtection.protectUserName !== undefined) {
    element.appendChild(
      writer.writeBoolean('ProtectUserName', memoryProtection.protectUserName),
    );
  }

  if (memoryProtection.protectPassword !== undefined) {
    element.appendChild(
      writer.writeBoolean('ProtectPassword', memoryProtection.protectPassword),
    );
  }

  if (memoryProtection.protectURL !== undefined) {
    element.appendChild(
      writer.writeBoolean('ProtectURL', memoryProtection.protectURL),
    );
  }

  if (memoryProtection.protectNotes !== undefined) {
    element.appendChild(
      writer.writeBoolean('ProtectNotes', memoryProtection.protectNotes),
    );
  }

  return element;
}
