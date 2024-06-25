import type AutoType from '../../types/database/AutoType';
import type AutoTypeAssociation from '../../types/database/AutoTypeAssociation';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseAutoTypeTag(reader: KdbxXmlReader): AutoType {
  reader.assertOpenedTagOf('AutoType');

  const autoType: AutoType = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Enabled':
        autoType.enabled = reader.readBooleanValue();
        break;

      case 'DataTransferObfuscation':
        autoType.dataTransferObfuscation = reader.readNumberValue();
        break;

      case 'DefaultSequence':
        autoType.defaultSequence = reader.readStringValue();
        break;

      case 'Association':
        if (!autoType.associations) {
          autoType.associations = [];
        }

        autoType.associations.push(
          parseAutoTypeAssociationTag(reader.readFromCurrent()),
        );
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "AutoType"`,
        );
    }
  }

  return autoType;
}

function parseAutoTypeAssociationTag(
  reader: KdbxXmlReader,
): AutoTypeAssociation {
  reader.assertOpenedTagOf('Association');

  const association: Partial<AutoTypeAssociation> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Window':
        association.window = reader.readStringValue();
        break;

      case 'KeystrokeSequence':
        association.sequence = reader.readStringValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Association"`,
        );
    }
  }

  if (!isAutoTypeAssociationComplete(association)) {
    throw new Error('Found "Association" tag with incomplete data');
  }

  return association;
}

function isAutoTypeAssociationComplete(
  association: Partial<AutoTypeAssociation>,
): association is AutoTypeAssociation {
  return association.window !== undefined && association.sequence !== undefined;
}
