import type { Element } from '@xmldom/xmldom';

import { type AutoType, type AutoTypeAssociation } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeAutoTypeTag(
  writer: KdbxXmlWriter,
  autoType: AutoType,
): Element {
  const element = writer.createElement('AutoType');

  if (autoType.enabled !== undefined) {
    element.appendChild(writer.writeBoolean('Enabled', autoType.enabled));
  }

  if (autoType.dataTransferObfuscation !== undefined) {
    element.appendChild(
      writer.writeNumber(
        'DataTransferObfuscation',
        autoType.dataTransferObfuscation,
      ),
    );
  }

  if (autoType.defaultSequence !== undefined) {
    element.appendChild(
      writer.writeString('DefaultSequence', autoType.defaultSequence),
    );
  }

  if (autoType.associations !== undefined) {
    for (const value of autoType.associations) {
      element.appendChild(writeAutoTypeAssociationTag(writer, value));
    }
  }

  return element;
}

function writeAutoTypeAssociationTag(
  writer: KdbxXmlWriter,
  association: AutoTypeAssociation,
): Element {
  const element = writer.createElement('Association');

  element.appendChild(writer.writeString('Window', association.window));
  element.appendChild(
    writer.writeString('KeystrokeSequence', association.sequence),
  );

  return element;
}
