import type { Element } from '@xmldom/xmldom';

import { type Group } from '../../types/database';
import { isDefaultIconNumber } from '../../utilities/isDefaultIconNumber';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseCustomDataTag from './parseCustomDataTag';
import parseEntryTag from './parseEntryTag';
import parseTimesTag from './parseTimesTag';

export default async function parseGroupTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<Group> {
  reader.assertTag(element, 'Group');

  const group: Partial<Group> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'UUID':
        group.uuid = await reader.readUuidValue(child);
        break;

      case 'Name':
        group.name = reader.readStringValue(child);
        break;

      case 'Notes':
        group.notes = reader.readStringValue(child);
        break;

      case 'Tags':
        group.tags = reader.readStringValue(child);
        break;

      case 'Times':
        group.timeInfo = parseTimesTag(reader, child);
        break;

      case 'IconID':
        group.iconNumber = reader.readNumberValue(child);

        if (!isDefaultIconNumber(group.iconNumber)) {
          console.warn(
            `Group has unexpected default icon number "${group.iconNumber}"`,
          );
        }
        break;

      case 'CustomIconUUID':
        group.customIcon = await reader.readUuidValue(child);
        break;

      case 'Group':
        if (!group.children) {
          group.children = [];
        }

        group.children.push(await parseGroupTag(reader, child));
        break;

      case 'Entry':
        if (!group.entries) {
          group.entries = [];
        }

        group.entries.push(await parseEntryTag(reader, child, false));
        break;

      case 'CustomData':
        group.customData = parseCustomDataTag(reader, child, false);
        break;

      case 'IsExpanded':
        group.isExpanded = reader.readBooleanValue(child);
        break;

      case 'DefaultAutoTypeSequence':
        group.defaultAutoTypeSequence = reader.readStringValue(child);
        break;

      case 'EnableAutoType':
        group.enableAutoType = reader.readNullableBoolean(child);
        break;

      case 'EnableSearching':
        group.enableSearching = reader.readNullableBoolean(child);
        break;

      case 'LastTopVisibleEntry':
        group.lastTopVisibleEntry = await reader.readUuidValue(child);
        break;

      case 'PreviousParentGroup':
        group.previousParentGroup = await reader.readUuidValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (!isGroupComplete(group)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return group;
}

function isGroupComplete(group: Partial<Group>): group is Group {
  return group.uuid !== undefined;
}
