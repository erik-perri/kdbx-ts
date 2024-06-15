import type Entry from '../../structure/Entry';
import { type XmlReader } from '../../utilities/XmlReader';
import parseAutoTypeAssociationTag from './parseAutoTypeAssociationTag';
import readBooleanValue from './readBooleanValue';
import readNumberValue from './readNumberValue';
import readStringValue from './readStringValue';

export default function processAutoTypeTag(
  reader: XmlReader,
  entry: Partial<Entry>,
): void {
  reader.assertOpenedTagOf('AutoType');

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Enabled':
        entry.autoTypeEnabled = readBooleanValue(reader);
        break;

      case 'DataTransferObfuscation':
        entry.autoTypeObfuscation = readNumberValue(reader);
        break;

      case 'DefaultSequence':
        entry.defaultAutoTypeSequence = readStringValue(reader);
        break;

      case 'Association':
        if (!entry.autoTypeAssociations) {
          entry.autoTypeAssociations = [];
        }

        entry.autoTypeAssociations.push(
          parseAutoTypeAssociationTag(reader.readFromCurrent()),
        );
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }
}
