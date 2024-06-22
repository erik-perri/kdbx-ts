import type Entry from '../../structure/Entry';
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
  fromHistory: boolean = false,
): Promise<Entry> {
  reader.assertOpenedTagOf('Entry');

  const entry: Partial<Entry> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'UUID':
        entry.uuid = await reader.readUuidValue();
        break;

      case 'String': {
        const { key, value, isProtected } = await parseEntryStringTag(
          reader.readFromCurrent(),
        );

        if (!entry.attributes) {
          entry.attributes = {};
        }
        if (entry.attributes[key] !== undefined) {
          throw new Error(`Duplicate custom attribute found in entry "${key}"`);
        }

        entry.attributes[key] = value;

        if (isProtected) {
          if (!entry.protectedAttributes) {
            entry.protectedAttributes = [];
          }
          entry.protectedAttributes.push(key);
        }
        break;
      }

      case 'Times':
        entry.timeInfo = parseTimesTag(reader.readFromCurrent());
        break;

      case 'History':
        if (fromHistory) {
          throw new Error('Recursive history element found');
        }

        entry.history = await parseEntryHistoryTag(reader.readFromCurrent());
        break;

      case 'CustomData':
        entry.customData = parseCustomDataTag(reader.readFromCurrent(), false);
        break;

      case 'IconID':
        entry.iconNumber = reader.readNumberValue();

        if (!isDefaultIconNumber(entry.iconNumber)) {
          console.warn(
            `Entry has unexpected default icon number "${entry.iconNumber}"`,
          );
        }
        break;

      case 'CustomIconUUID':
        entry.customIcon = await reader.readUuidValue();
        break;

      case 'ForegroundColor':
        entry.foregroundColor = reader.readColorValue();
        break;

      case 'BackgroundColor':
        entry.backgroundColor = reader.readColorValue();
        break;

      case 'OverrideURL':
        entry.overrideURL = reader.readStringValue();
        break;

      case 'Tags':
        entry.tags = reader.readStringValue();
        break;

      case 'QualityCheck':
        entry.qualityCheck = reader.readBooleanValue();
        break;

      case 'Binary': {
        const { key, ref } = parseEntryBinaryTag(reader.readFromCurrent());
        const binary = reader.readBinaryPoolData(ref);

        if (!entry.attachments) {
          entry.attachments = {};
        }

        entry.attachments[key] = binary;
        break;
      }

      case 'AutoType':
        entry.autoType = parseAutoTypeTag(reader.readFromCurrent());
        break;

      case 'PreviousParentGroup':
        entry.previousParentGroup = await reader.readUuidValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${reader.current.name}" while parsing "Entry"`,
        );
    }
  }

  if (!isEntryComplete(entry)) {
    throw new Error('Found "Entry" tag with incomplete data');
  }

  return entry;
}

function isEntryComplete(entry: Partial<Entry>): entry is Entry {
  return entry.uuid !== undefined;
}
