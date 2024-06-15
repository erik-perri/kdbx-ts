import type Entry from '../../structure/Entry';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseAutoTypeAssociationTag from './parseAutoTypeAssociationTag';

export default function processAutoTypeTag(
  reader: KdbxXmlReader,
  entry: Partial<Entry>,
): void {
  reader.assertOpenedTagOf('AutoType');

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Enabled':
        entry.autoTypeEnabled = reader.readBooleanValue();
        break;

      case 'DataTransferObfuscation':
        entry.autoTypeObfuscation = reader.readNumberValue();
        break;

      case 'DefaultSequence':
        entry.defaultAutoTypeSequence = reader.readStringValue();
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
