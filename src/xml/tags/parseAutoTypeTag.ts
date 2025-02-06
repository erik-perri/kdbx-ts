import { type AutoType, type AutoTypeAssociation } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseAutoTypeTag(reader: KdbxXmlReader): AutoType {
  reader.expect('AutoType');

  const autoType: AutoType = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Enabled':
        autoType.enabled = element.readBooleanValue();
        break;

      case 'DataTransferObfuscation':
        autoType.dataTransferObfuscation = element.readNumberValue();
        break;

      case 'DefaultSequence':
        autoType.defaultSequence = element.readStringValue();
        break;

      case 'Association':
        if (!autoType.associations) {
          autoType.associations = [];
        }

        autoType.associations.push(parseAutoTypeAssociationTag(element));
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  return autoType;
}

function parseAutoTypeAssociationTag(
  reader: KdbxXmlReader,
): AutoTypeAssociation {
  reader.expect('Association');

  const association: Partial<AutoTypeAssociation> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Window':
        association.window = element.readStringValue();
        break;

      case 'KeystrokeSequence':
        association.sequence = element.readStringValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (!isAutoTypeAssociationComplete(association)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return association;
}

function isAutoTypeAssociationComplete(
  association: Partial<AutoTypeAssociation>,
): association is AutoTypeAssociation {
  return association.window !== undefined && association.sequence !== undefined;
}
