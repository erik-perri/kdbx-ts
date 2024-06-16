import type Group from '../../structure/Group';
import { isDefaultIconNumber } from '../../utilities/isDefaultIconNumber';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import { type BinaryPool } from '../types';
import parseCustomDataTag from './parseCustomDataTag';
import parseEntryTag from './parseEntryTag';
import parseTimesTag from './parseTimesTag';

export default async function parseGroupTag(
  reader: KdbxXmlReader,
  binaryPool: BinaryPool,
): Promise<Group> {
  reader.assertOpenedTagOf('Group');

  const group: Partial<Group> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'UUID':
        group.uuid = await reader.readUuidValue();
        break;

      case 'Name':
        group.name = reader.readStringValue();
        break;

      case 'Notes':
        group.notes = reader.readStringValue();
        break;

      case 'Tags':
        group.tags = reader.readStringValue();
        break;

      case 'Times':
        group.timeInfo = parseTimesTag(reader.readFromCurrent());
        break;

      case 'IconID':
        group.iconNumber = reader.readNumberValue();

        if (!isDefaultIconNumber(group.iconNumber)) {
          console.warn(
            `Group has unexpected default icon number "${group.iconNumber}"`,
          );
        }
        break;

      case 'CustomIconUUID':
        group.customIcon = await reader.readUuidValue();
        break;

      case 'Group':
        if (!group.children) {
          group.children = [];
        }

        group.children.push(
          await parseGroupTag(reader.readFromCurrent(), binaryPool),
        );
        break;

      case 'Entry':
        if (!group.entries) {
          group.entries = [];
        }

        group.entries.push(
          await parseEntryTag(reader.readFromCurrent(), binaryPool),
        );
        break;

      case 'CustomData':
        group.customData = parseCustomDataTag(reader.readFromCurrent());
        break;

      case 'IsExpanded':
        group.isExpanded = reader.readBooleanValue();
        break;

      case 'DefaultAutoTypeSequence':
        group.defaultAutoTypeSequence = reader.readStringValue();
        break;

      case 'EnableAutoType':
        group.enableAutoType = reader.readTriStateValue();
        break;

      case 'EnableSearching':
        group.enableSearching = reader.readTriStateValue();
        break;

      case 'LastTopVisibleEntry':
        group.lastTopVisibleEntry = await reader.readUuidValue();
        break;

      case 'PreviousParentGroup':
        group.previousParentGroup = await reader.readUuidValue();
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

function isGroupComplete(group: Partial<Group>): group is Group {
  return (
    group.defaultAutoTypeSequence !== undefined &&
    group.enableAutoType !== undefined &&
    group.enableSearching !== undefined &&
    group.iconNumber !== undefined &&
    group.isExpanded !== undefined &&
    group.lastTopVisibleEntry !== undefined &&
    group.name !== undefined &&
    group.notes !== undefined &&
    group.timeInfo !== undefined &&
    group.uuid !== undefined
  );
}
