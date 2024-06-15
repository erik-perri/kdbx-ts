import type AutoTypeAssociation from '../../structure/AutoTypeAssociation';
import { isAutoTypeAssociationComplete } from '../../structure/utilities';
import type { XmlReader } from '../../utilities/XmlReader';
import readStringValue from './readStringValue';

export default function parseAutoTypeAssociationTag(
  reader: XmlReader,
): AutoTypeAssociation {
  reader.assertOpenedTagOf('Association');

  const association: Partial<AutoTypeAssociation> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Window':
        association.window = readStringValue(reader);
        break;

      case 'KeystrokeSequence':
        association.sequence = readStringValue(reader);
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isAutoTypeAssociationComplete(association)) {
    throw new Error('Auto-type association window or sequence missing');
  }

  return association;
}
