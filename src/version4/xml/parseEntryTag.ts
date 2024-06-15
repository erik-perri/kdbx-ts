import type { CryptoCipher } from '../../crypto/types';
import type Entry from '../../structure/Entry';
import { isEntryComplete } from '../../structure/utilities';
import { type XmlReader } from '../../utilities/XmlReader';
import type { BinaryPool } from '../types';
import parseCustomDataTag from './parseCustomDataTag';
import parseEntryBinaryTag from './parseEntryBinaryTag';
import parseEntryHistoryTag from './parseEntryHistoryTag';
import parseEntryStringTag from './parseEntryStringTag';
import parseTimesTag from './parseTimesTag';
import processAutoTypeTag from './processAutoTypeTag';
import readBooleanValue from './readBooleanValue';
import readColorValue from './readColorValue';
import readNumberValue from './readNumberValue';
import readStringValue from './readStringValue';
import readUuidValue from './readUuidValue';

export default async function parseEntryTag(
  reader: XmlReader,
  binaryPool: BinaryPool,
  randomStream: CryptoCipher,
  fromHistory: boolean = false,
): Promise<Entry> {
  reader.assertOpenedTagOf('Entry');

  const entry: Partial<Entry> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'UUID':
        entry.uuid = await readUuidValue(reader);
        break;

      case 'String': {
        const { key, value, isProtected } = await parseEntryStringTag(
          reader.readFromCurrent(),
          randomStream,
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

        entry.history = await parseEntryHistoryTag(
          reader.readFromCurrent(),
          binaryPool,
          randomStream,
        );
        break;

      case 'CustomData':
        entry.customData = parseCustomDataTag(reader.readFromCurrent());
        break;

      case 'IconID':
        entry.iconNumber = readNumberValue(reader);
        break;

      case 'CustomIconUUID':
        entry.customIcon = await readUuidValue(reader);
        break;

      case 'ForegroundColor':
        entry.foregroundColor = readColorValue(reader);
        break;

      case 'BackgroundColor':
        entry.backgroundColor = readColorValue(reader);
        break;

      case 'OverrideURL':
        entry.overrideURL = readStringValue(reader);
        break;

      case 'Tags':
        entry.tags = readStringValue(reader);
        break;

      case 'QualityCheck':
        entry.qualityCheck = readBooleanValue(reader);
        break;

      case 'Binary': {
        const { key, ref } = parseEntryBinaryTag(reader.readFromCurrent());

        const binary = binaryPool[ref];
        if (binary === undefined) {
          throw new Error(`Unknown Binary ref "${ref}"`);
        }

        if (!entry.attachments) {
          entry.attachments = {};
        }

        entry.attachments[key] = binary;
        break;
      }

      case 'AutoType':
        processAutoTypeTag(reader.readFromCurrent(), entry);
        break;

      case 'PreviousParentGroup':
        entry.previousParentGroup = await readUuidValue(reader);
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isEntryComplete(entry)) {
    throw new Error('Entry is incomplete');
  }

  return entry;
}
