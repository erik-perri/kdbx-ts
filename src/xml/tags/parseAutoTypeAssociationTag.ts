import type AutoTypeAssociation from '../../structure/AutoTypeAssociation';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';

export default function parseAutoTypeAssociationTag(
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
