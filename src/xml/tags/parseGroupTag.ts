import type Group from '../../structure/Group';
import { isDefaultIconNumber } from '../../utilities/isDefaultIconNumber';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseCustomDataTag from './parseCustomDataTag';
import parseEntryTag from './parseEntryTag';
import parseTimesTag from './parseTimesTag';

export default async function parseGroupTag(
  reader: KdbxXmlReader,
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

        group.children.push(await parseGroupTag(reader.readFromCurrent()));
        break;

      case 'Entry':
        if (!group.entries) {
          group.entries = [];
        }

        group.entries.push(
          await parseEntryTag(reader.readFromCurrent(), false),
        );
        break;

      case 'CustomData':
        group.customData = parseCustomDataTag(reader.readFromCurrent(), false);
        break;

      case 'IsExpanded':
        group.isExpanded = reader.readBooleanValue();
        break;

      case 'DefaultAutoTypeSequence':
        group.defaultAutoTypeSequence = reader.readStringValue();
        break;

      case 'EnableAutoType':
        group.enableAutoType = reader.readNullableBoolean();
        break;

      case 'EnableSearching':
        group.enableSearching = reader.readNullableBoolean();
        break;

      case 'LastTopVisibleEntry':
        group.lastTopVisibleEntry = await reader.readUuidValue();
        break;

      case 'PreviousParentGroup':
        group.previousParentGroup = await reader.readUuidValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Group"`,
        );
    }
  }

  if (!isGroupComplete(group)) {
    throw new Error('Found "Group" tag with incomplete data');
  }

  return group;
}

function isGroupComplete(group: Partial<Group>): group is Group {
  return group.uuid !== undefined;
}
