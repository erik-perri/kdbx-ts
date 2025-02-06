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
  fromHistory: boolean,
): Promise<Entry> {
  reader.expect('Entry');

  const entry: Partial<Entry> = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'UUID':
        entry.uuid = await element.readUuidValue();
        break;

      case 'String': {
        const value = await parseEntryStringTag(element);

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
        entry.timeInfo = parseTimesTag(element);
        break;

      case 'History':
        if (fromHistory) {
          throw new Error('Recursive history element found');
        }

        entry.history = await parseEntryHistoryTag(element);
        break;

      case 'CustomData':
        entry.customData = parseCustomDataTag(element, false);
        break;

      case 'IconID':
        entry.iconNumber = element.readNumberValue();

        if (!isDefaultIconNumber(entry.iconNumber)) {
          console.warn(
            `Entry has unexpected default icon number "${entry.iconNumber}"`,
          );
        }
        break;

      case 'CustomIconUUID':
        entry.customIcon = await element.readUuidValue();
        break;

      case 'ForegroundColor':
        entry.foregroundColor = element.readColorValue();
        break;

      case 'BackgroundColor':
        entry.backgroundColor = element.readColorValue();
        break;

      case 'OverrideURL':
        entry.overrideURL = element.readStringValue();
        break;

      case 'Tags':
        entry.tags = element.readStringValue();
        break;

      case 'QualityCheck':
        entry.qualityCheck = element.readBooleanValue();
        break;

      case 'Binary': {
        const tag = parseEntryBinaryTag(element);
        const data = element.readBinaryPoolData(tag.ref);

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
        entry.autoType = parseAutoTypeTag(element);
        break;

      case 'PreviousParentGroup':
        entry.previousParentGroup = await element.readUuidValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  if (!isEntryComplete(entry)) {
    throw new Error(`Found "${reader.tagName}" tag with incomplete data`);
  }

  return entry;
}

function isEntryComplete(entry: Partial<Entry>): entry is Entry {
  return entry.uuid !== undefined;
}
