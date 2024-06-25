import type MemoryProtection from '../../types/database/MemoryProtection';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeMemoryProtectionTag(
  writer: KdbxXmlWriter,
  memoryProtection: MemoryProtection,
): void {
  if (isEmpty(memoryProtection)) {
    return;
  }

  writer.writeStartElement('MemoryProtection');

  if (memoryProtection.protectTitle !== undefined) {
    writer.writeBoolean('ProtectTitle', memoryProtection.protectTitle);
  }

  if (memoryProtection.protectUserName !== undefined) {
    writer.writeBoolean('ProtectUserName', memoryProtection.protectUserName);
  }

  if (memoryProtection.protectPassword !== undefined) {
    writer.writeBoolean('ProtectPassword', memoryProtection.protectPassword);
  }

  if (memoryProtection.protectURL !== undefined) {
    writer.writeBoolean('ProtectURL', memoryProtection.protectURL);
  }

  if (memoryProtection.protectNotes !== undefined) {
    writer.writeBoolean('ProtectNotes', memoryProtection.protectNotes);
  }

  writer.writeEndElement();
}

function isEmpty(memoryProtection: MemoryProtection): boolean {
  return Object.keys(memoryProtection).length === 0;
}
