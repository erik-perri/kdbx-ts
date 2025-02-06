import { type Element } from '@xmldom/xmldom';

import { type Entry } from '../../types/database';
import { isDefaultIconNumber } from '../../utilities/isDefaultIconNumber';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseAutoTypeTag from './parseAutoTypeTag';
import parseCustomDataTag from './parseCustomDataTag';
import parseEntryBinaryTag from './parseEntryBinaryTag';
import parseEntryHistoryTag from './parseEntryHistoryTag';
import parseEntryStringTag from './parseEntryStringTag';
import parseTimesTag from './parseTimesTag';

export default async function parseEntryTag(
  reader: KdbxXmlReader,
  element: Element,
  fromHistory: boolean,
): Promise<Entry> {
  reader.assertTag(element, 'Entry');

  const entry: Partial<Entry> = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'UUID':
        entry.uuid = await reader.readUuidValue(child);
        break;

      case 'String': {
        const value = await parseEntryStringTag(reader, child);

        if (!entry.attributes) {
          entry.attributes = {};
        }
        if (entry.attributes[value.key] !== undefined) {
          throw new Error(
            `Duplicate custom attribute found in entry "${value.key}"`,
          );
        }

        entry.attributes[value.key] = value;
        break;
      }

      case 'Times':
        entry.timeInfo = parseTimesTag(reader, child);
        break;

      case 'History':
        if (fromHistory) {
          throw new Error('Recursive history element found');
        }

        entry.history = await parseEntryHistoryTag(reader, child);
        break;

      case 'CustomData':
        entry.customData = parseCustomDataTag(reader, child, false);
        break;

      case 'IconID':
        entry.iconNumber = reader.readNumberValue(child);

        if (!isDefaultIconNumber(entry.iconNumber)) {
          console.warn(
            `Entry has unexpected default icon number "${entry.iconNumber}"`,
          );
        }
        break;

      case 'CustomIconUUID':
        entry.customIcon = await reader.readUuidValue(child);
        break;

      case 'ForegroundColor':
        entry.foregroundColor = reader.readColorValue(child);
        break;

      case 'BackgroundColor':
        entry.backgroundColor = reader.readColorValue(child);
        break;

      case 'OverrideURL':
        entry.overrideURL = reader.readStringValue(child);
        break;

      case 'Tags':
        entry.tags = reader.readStringValue(child);
        break;

      case 'QualityCheck':
        entry.qualityCheck = reader.readBooleanValue(child);
        break;

      case 'Binary': {
        const tag = parseEntryBinaryTag(reader, child);
        const data = reader.readBinaryPoolData(tag.ref);

        if (!entry.attachments) {
          entry.attachments = {};
        }

        entry.attachments[tag.key] = {
          ...tag,
          data,
        };
        break;
      }

      case 'AutoType':
        entry.autoType = parseAutoTypeTag(reader, child);
        break;

      case 'PreviousParentGroup':
        entry.previousParentGroup = await reader.readUuidValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  if (!isEntryComplete(entry)) {
    throw new Error(`Found "${element.tagName}" tag with incomplete data`);
  }

  return entry;
}

function isEntryComplete(entry: Partial<Entry>): entry is Entry {
  return entry.uuid !== undefined;
}
