import type AutoType from '../../structure/AutoType';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseAutoTypeAssociationTag from './parseAutoTypeAssociationTag';

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
        reader.skipCurrentElement();
        break;
    }
  }

  return autoType;
}
