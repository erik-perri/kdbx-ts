import { type Group } from '../../types/database';
import { isDefaultIconNumber } from '../../utilities/isDefaultIconNumber';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseCustomDataTag from './parseCustomDataTag';
import parseEntryTag from './parseEntryTag';
import parseTimesTag from './parseTimesTag';

export default async function parseGroupTag(
  reader: KdbxXmlReader,
): Promise<Group> {
  reader.expect('Group');

  const group: Partial<Group> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'UUID':
        group.uuid = await element.readUuidValue();
        break;

      case 'Name':
        group.name = element.readStringValue();
        break;

      case 'Notes':
        group.notes = element.readStringValue();
        break;

      case 'Tags':
        group.tags = element.readStringValue();
        break;

      case 'Times':
        group.timeInfo = parseTimesTag(element);
        break;

      case 'IconID':
        group.iconNumber = element.readNumberValue();

        if (!isDefaultIconNumber(group.iconNumber)) {
          console.warn(
            `Group has unexpected default icon number "${group.iconNumber}"`,
          );
        }
        break;

      case 'CustomIconUUID':
        group.customIcon = await element.readUuidValue();
        break;

      case 'Group':
        if (!group.children) {
          group.children = [];
        }

        group.children.push(await parseGroupTag(element));
        break;

      case 'Entry':
        if (!group.entries) {
          group.entries = [];
        }

        group.entries.push(await parseEntryTag(element, false));
        break;

      case 'CustomData':
        group.customData = parseCustomDataTag(element, false);
        break;

      case 'IsExpanded':
        group.isExpanded = element.readBooleanValue();
        break;

      case 'DefaultAutoTypeSequence':
        group.defaultAutoTypeSequence = element.readStringValue();
        break;

      case 'EnableAutoType':
        group.enableAutoType = element.readNullableBoolean();
        break;

      case 'EnableSearching':
        group.enableSearching = element.readNullableBoolean();
        break;

      case 'LastTopVisibleEntry':
        group.lastTopVisibleEntry = await element.readUuidValue();
        break;

      case 'PreviousParentGroup':
        group.previousParentGroup = await element.readUuidValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (!isGroupComplete(group)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return group;
}

function isGroupComplete(group: Partial<Group>): group is Group {
  return group.uuid !== undefined;
}
