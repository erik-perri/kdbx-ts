import type Group from '../../types/database/Group';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeCustomDataTag from './writeCustomDataTag';
import writeEntryTag from './writeEntryTag';
import writeTimesTag from './writeTimesTag';

export default async function writeGroupTag(
  writer: KdbxXmlWriter,
  group: Group,
): Promise<void> {
  writer.writeStartElement('Group');

  writer.writeUuid('UUID', group.uuid, true);

  if (group.name !== undefined) {
    writer.writeString('Name', group.name);
  }

  if (group.notes !== undefined) {
    writer.writeString('Notes', group.notes);
  }

  if (group.tags !== undefined) {
    writer.writeString('Tags', group.tags);
  }

  if (group.iconNumber !== undefined) {
    writer.writeNumber('IconID', group.iconNumber);
  }

  if (group.customIcon !== undefined) {
    writer.writeUuid('CustomIconUUID', group.customIcon, true);
  }

  if (group.timeInfo !== undefined) {
    writeTimesTag(writer, group.timeInfo);
  }

  if (group.isExpanded !== undefined) {
    writer.writeBoolean('IsExpanded', group.isExpanded);
  }

  if (group.defaultAutoTypeSequence !== undefined) {
    writer.writeString(
      'DefaultAutoTypeSequence',
      group.defaultAutoTypeSequence,
    );
  }

  if (group.enableAutoType !== undefined) {
    writer.writeNullableBoolean('EnableAutoType', group.enableAutoType);
  }

  if (group.enableSearching !== undefined) {
    writer.writeNullableBoolean('EnableSearching', group.enableSearching);
  }

  if (group.lastTopVisibleEntry !== undefined) {
    writer.writeUuid('LastTopVisibleEntry', group.lastTopVisibleEntry, false);
  }

  if (group.customData !== undefined) {
    writeCustomDataTag(writer, group.customData, false);
  }

  if (group.previousParentGroup !== undefined) {
    writer.writeUuid('PreviousParentGroup', group.previousParentGroup, true);
  }

  if (group.entries !== undefined) {
    for (const entry of group.entries) {
      await writeEntryTag(writer, entry, false);
    }
  }

  if (group.children !== undefined) {
    for (const child of group.children) {
      await writeGroupTag(writer, child);
    }
  }

  writer.writeEndElement();
}
