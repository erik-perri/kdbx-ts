import { type AutoType, type AutoTypeAssociation } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeAutoTypeTag(
  writer: KdbxXmlWriter,
  autoType: AutoType,
): void {
  writer.writeStartElement('AutoType');

  if (autoType.enabled !== undefined) {
    writer.writeBoolean('Enabled', autoType.enabled);
  }

  if (autoType.dataTransferObfuscation !== undefined) {
    writer.writeNumber(
      'DataTransferObfuscation',
      autoType.dataTransferObfuscation,
    );
  }

  if (autoType.defaultSequence !== undefined) {
    writer.writeString('DefaultSequence', autoType.defaultSequence);
  }

  if (autoType.associations !== undefined) {
    for (const value of autoType.associations) {
      writeAutoTypeAssociationTag(writer, value);
    }
  }

  writer.writeEndElement();
}

function writeAutoTypeAssociationTag(
  writer: KdbxXmlWriter,
  association: AutoTypeAssociation,
): void {
  writer.writeStartElement('Association');

  writer.writeString('Window', association.window);
  writer.writeString('KeystrokeSequence', association.sequence);

  writer.writeEndElement();
}
