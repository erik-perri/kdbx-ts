import type Entry from '../../structure/Entry';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeAutoTypeTag from './writeAutoTypeTag';
import writeCustomDataTag from './writeCustomDataTag';
import writeEntryBinaryTag from './writeEntryBinaryTag';
import writeEntryHistoryTag from './writeEntryHistoryTag';
import writeEntryStringTag from './writeEntryStringTag';
import writeTimesTag from './writeTimesTag';

export default async function writeEntryTag(
  writer: KdbxXmlWriter,
  entry: Entry,
  fromHistory: boolean,
): Promise<void> {
  writer.writeStartElement('Entry');

  writer.writeUuid('UUID', entry.uuid, true);

  if (entry.iconNumber !== undefined) {
    writer.writeNumber('IconID', entry.iconNumber);
  }

  if (entry.foregroundColor !== undefined) {
    writer.writeColor('ForegroundColor', entry.foregroundColor);
  }

  if (entry.backgroundColor !== undefined) {
    writer.writeColor('BackgroundColor', entry.backgroundColor);
  }

  if (entry.overrideURL !== undefined) {
    writer.writeString('OverrideURL', entry.overrideURL);
  }

  if (entry.tags !== undefined) {
    writer.writeString('Tags', entry.tags);
  }

  if (entry.timeInfo !== undefined) {
    writeTimesTag(writer, entry.timeInfo);
  }

  if (entry.qualityCheck !== undefined) {
    writer.writeBoolean('QualityCheck', entry.qualityCheck);
  }

  if (entry.previousParentGroup !== undefined) {
    writer.writeUuid('PreviousParentGroup', entry.previousParentGroup, true);
  }

  if (entry.attributes !== undefined) {
    for (const value of Object.values(entry.attributes)) {
      if (value === undefined) {
        continue;
      }

      await writeEntryStringTag(writer, value);
    }
  }

  if (entry.attachments !== undefined) {
    for (const attachment of Object.values(entry.attachments)) {
      if (attachment === undefined) {
        continue;
      }

      writeEntryBinaryTag(writer, attachment);
    }
  }

  if (entry.autoType !== undefined) {
    writeAutoTypeTag(writer, entry.autoType);
  }

  if (entry.customData !== undefined) {
    writeCustomDataTag(writer, entry.customData, false);
  }

  if (entry.customIcon !== undefined) {
    writer.writeUuid('CustomIconUUID', entry.customIcon, true);
  }

  if (entry.history !== undefined) {
    if (fromHistory) {
      throw new Error('Recursive history element found');
    }

    await writeEntryHistoryTag(writer, entry.history);
  }

  writer.writeEndElement();
}
