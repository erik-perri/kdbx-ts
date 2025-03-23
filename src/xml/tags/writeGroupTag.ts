import type { Element } from '@xmldom/xmldom';

import { type Group } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeCustomDataTag from './writeCustomDataTag';
import writeEntryTag from './writeEntryTag';
import writeTimesTag from './writeTimesTag';

export default async function writeGroupTag(
  writer: KdbxXmlWriter,
  group: Group,
): Promise<Element> {
  const element = writer.createElement('Group');

  element.appendChild(writer.writeUuid('UUID', group.uuid, true));

  if (group.name !== undefined) {
    element.appendChild(writer.writeString('Name', group.name));
  }

  if (group.notes !== undefined) {
    element.appendChild(writer.writeString('Notes', group.notes));
  }

  if (group.tags !== undefined) {
    element.appendChild(writer.writeString('Tags', group.tags));
  }

  if (group.iconNumber !== undefined) {
    element.appendChild(writer.writeNumber('IconID', group.iconNumber));
  }

  if (group.customIcon !== undefined) {
    element.appendChild(
      writer.writeUuid('CustomIconUUID', group.customIcon, true),
    );
  }

  if (group.timeInfo !== undefined) {
    element.appendChild(writeTimesTag(writer, group.timeInfo));
  }

  if (group.isExpanded !== undefined) {
    element.appendChild(writer.writeBoolean('IsExpanded', group.isExpanded));
  }

  if (group.defaultAutoTypeSequence !== undefined) {
    element.appendChild(
      writer.writeString(
        'DefaultAutoTypeSequence',
        group.defaultAutoTypeSequence,
      ),
    );
  }

  if (group.enableAutoType !== undefined) {
    element.appendChild(
      writer.writeNullableBoolean('EnableAutoType', group.enableAutoType),
    );
  }

  if (group.enableSearching !== undefined) {
    element.appendChild(
      writer.writeNullableBoolean('EnableSearching', group.enableSearching),
    );
  }

  if (group.lastTopVisibleEntry !== undefined) {
    element.appendChild(
      writer.writeUuid('LastTopVisibleEntry', group.lastTopVisibleEntry, false),
    );
  }

  if (group.customData !== undefined) {
    element.appendChild(writeCustomDataTag(writer, group.customData, false));
  }

  if (group.previousParentGroup !== undefined) {
    element.appendChild(
      writer.writeUuid('PreviousParentGroup', group.previousParentGroup, true),
    );
  }

  if (group.entries !== undefined) {
    for (const entry of group.entries) {
      element.appendChild(await writeEntryTag(writer, entry, false));
    }
  }

  if (group.children !== undefined) {
    for (const child of group.children) {
      element.appendChild(await writeGroupTag(writer, child));
    }
  }

  return element;
}
