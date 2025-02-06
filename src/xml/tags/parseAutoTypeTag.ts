import { type Element } from '@xmldom/xmldom';

import { type AutoType, type AutoTypeAssociation } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseAutoTypeTag(
  reader: KdbxXmlReader,
  element: Element,
): AutoType {
  reader.assertTag(element, 'AutoType');

  const autoType: AutoType = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Enabled':
        autoType.enabled = reader.readBooleanValue(child);
        break;

      case 'DataTransferObfuscation':
        autoType.dataTransferObfuscation = reader.readNumberValue(child);
        break;

      case 'DefaultSequence':
        autoType.defaultSequence = reader.readStringValue(child);
        break;

      case 'Association':
        if (!autoType.associations) {
          autoType.associations = [];
        }

        autoType.associations.push(parseAutoTypeAssociationTag(reader, child));
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  return autoType;
}

function parseAutoTypeAssociationTag(
  reader: KdbxXmlReader,
  element: Element,
): AutoTypeAssociation {
  reader.assertTag(element, 'Association');

  const association: Partial<AutoTypeAssociation> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Window':
        association.window = reader.readStringValue(child);
        break;

      case 'KeystrokeSequence':
        association.sequence = reader.readStringValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (!isAutoTypeAssociationComplete(association)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return association;
}

function isAutoTypeAssociationComplete(
  association: Partial<AutoTypeAssociation>,
): association is AutoTypeAssociation {
  return association.window !== undefined && association.sequence !== undefined;
}
