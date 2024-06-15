import { type CryptoCipher } from '../../crypto/types';
import type Group from '../../structure/Group';
import { isGroupComplete } from '../../structure/utilities';
import { type XmlReader } from '../../utilities/XmlReader';
import { type BinaryPool } from '../types';
import parseCustomDataTag from './parseCustomDataTag';
import parseEntryTag from './parseEntryTag';
import parseTimesTag from './parseTimesTag';
import readBooleanValue from './readBooleanValue';
import readNumberValue from './readNumberValue';
import readStringValue from './readStringValue';
import readTriStateValue from './readTriStateValue';
import readUuidValue from './readUuidValue';

export default async function parseGroupTag(
  reader: XmlReader,
  binaryPool: BinaryPool,
  randomStream: CryptoCipher,
): Promise<Group> {
  reader.assertOpenedTagOf('Group');

  const group: Partial<Group> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'UUID':
        group.uuid = await readUuidValue(reader);
        break;

      case 'Name':
        group.name = readStringValue(reader);
        break;

      case 'Notes':
        group.notes = readStringValue(reader);
        break;

      case 'Tags':
        group.tags = readStringValue(reader);
        break;

      case 'Times':
        group.timeInfo = parseTimesTag(reader.readFromCurrent());
        break;

      case 'IconID':
        group.iconNumber = readNumberValue(reader);
        break;

      case 'CustomIconUUID':
        group.customIcon = await readUuidValue(reader);
        break;

      case 'Group': {
        if (!group.children) {
          group.children = [];
        }

        group.children.push(
          await parseGroupTag(
            reader.readFromCurrent(),
            binaryPool,
            randomStream,
          ),
        );
        break;
      }

      case 'Entry': {
        if (!group.entries) {
          group.entries = [];
        }

        group.entries.push(
          await parseEntryTag(
            reader.readFromCurrent(),
            binaryPool,
            randomStream,
          ),
        );
        break;
      }

      case 'CustomData':
        group.customData = parseCustomDataTag(reader.readFromCurrent());
        break;

      case 'IsExpanded':
        group.isExpanded = readBooleanValue(reader);
        break;

      case 'DefaultAutoTypeSequence':
        group.defaultAutoTypeSequence = readStringValue(reader);
        break;

      case 'EnableAutoType':
        group.enableAutoType = readTriStateValue(reader);
        break;

      case 'EnableSearching':
        group.enableSearching = readTriStateValue(reader);
        break;

      case 'LastTopVisibleEntry':
        group.lastTopVisibleEntry = await readUuidValue(reader);
        break;

      case 'PreviousParentGroup':
        group.previousParentGroup = await readUuidValue(reader);
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isGroupComplete(group)) {
    throw new Error('Group is incomplete');
  }

  return group;
}
