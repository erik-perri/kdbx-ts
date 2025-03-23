import type { Element } from '@xmldom/xmldom';

import { type Entry } from '../../types/database';
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
): Promise<Element> {
  const element = writer.createElement('Entry');

  element.appendChild(writer.writeUuid('UUID', entry.uuid, true));

  if (entry.iconNumber !== undefined) {
    element.appendChild(writer.writeNumber('IconID', entry.iconNumber));
  }

  if (entry.foregroundColor !== undefined) {
    element.appendChild(
      writer.writeColor('ForegroundColor', entry.foregroundColor),
    );
  }

  if (entry.backgroundColor !== undefined) {
    element.appendChild(
      writer.writeColor('BackgroundColor', entry.backgroundColor),
    );
  }

  if (entry.overrideURL !== undefined) {
    element.appendChild(writer.writeString('OverrideURL', entry.overrideURL));
  }

  if (entry.tags !== undefined) {
    element.appendChild(writer.writeString('Tags', entry.tags));
  }

  if (entry.timeInfo !== undefined) {
    element.appendChild(writeTimesTag(writer, entry.timeInfo));
  }

  if (entry.qualityCheck !== undefined) {
    element.appendChild(
      writer.writeBoolean('QualityCheck', entry.qualityCheck),
    );
  }

  if (entry.previousParentGroup !== undefined) {
    element.appendChild(
      writer.writeUuid('PreviousParentGroup', entry.previousParentGroup, true),
    );
  }

  if (entry.attributes !== undefined) {
    for (const value of Object.values(entry.attributes)) {
      if (value === undefined) {
        continue;
      }

      element.appendChild(await writeEntryStringTag(writer, value));
    }
  }

  if (entry.attachments !== undefined) {
    for (const attachment of Object.values(entry.attachments)) {
      if (attachment === undefined) {
        continue;
      }

      element.appendChild(writeEntryBinaryTag(writer, attachment));
    }
  }

  if (entry.autoType !== undefined) {
    element.appendChild(writeAutoTypeTag(writer, entry.autoType));
  }

  if (entry.customData !== undefined) {
    element.appendChild(writeCustomDataTag(writer, entry.customData, false));
  }

  if (entry.customIcon !== undefined) {
    element.appendChild(
      writer.writeUuid('CustomIconUUID', entry.customIcon, true),
    );
  }

  if (entry.history !== undefined) {
    if (fromHistory) {
      throw new Error('Recursive history element found');
    }

    element.appendChild(await writeEntryHistoryTag(writer, entry.history));
  }

  return element;
}
