import type { CryptoCipher } from '../../crypto/types';
import type Metadata from '../../structure/Metadata';
import { isMetadataComplete } from '../../structure/utilities';
import type { XmlReader } from '../../utilities/XmlReader';
import type { BinaryPool } from '../types';
import parseCustomDataTag from './parseCustomDataTag';
import parseCustomIconsTag from './parseCustomIconsTag';
import processMemoryProtectionTag from './processMemoryProtectionTag';
import readBinaryValue from './readBinaryValue';
import readBooleanValue from './readBooleanValue';
import readColorValue from './readColorValue';
import readDateTimeValue from './readDateTimeValue';
import readNumberValue from './readNumberValue';
import readStringValue from './readStringValue';
import readUnsignedNumberValue from './readUnsignedNumberValue';
import readUuidValue from './readUuidValue';

export default async function parseMetaTag(
  reader: XmlReader,
  binaryPool: BinaryPool,
  randomStream: CryptoCipher,
): Promise<Metadata> {
  reader.assertOpenedTagOf('Meta');

  const metadata: Partial<Metadata> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Generator':
        metadata.generator = readStringValue(reader);
        break;

      case 'HeaderHash':
        metadata.headerHash = await readBinaryValue(reader, randomStream);
        break;

      case 'DatabaseName':
        metadata.name = readStringValue(reader);
        break;

      case 'DatabaseNameChanged':
        metadata.nameChanged = readDateTimeValue(reader);
        break;

      case 'DatabaseDescription':
        metadata.description = readStringValue(reader);
        break;

      case 'DatabaseDescriptionChanged':
        metadata.descriptionChanged = readDateTimeValue(reader);
        break;

      case 'DefaultUserName':
        metadata.defaultUserName = readStringValue(reader);
        break;

      case 'DefaultUserNameChanged':
        metadata.defaultUserNameChanged = readDateTimeValue(reader);
        break;

      case 'MaintenanceHistoryDays':
        metadata.maintenanceHistoryDays = readNumberValue(reader);
        break;

      case 'Color':
        metadata.color = readColorValue(reader);
        break;

      case 'MasterKeyChanged':
        metadata.masterKeyChanged = readDateTimeValue(reader);
        break;

      case 'MasterKeyChangeRec':
        metadata.masterKeyChangeRec = readNumberValue(reader);
        break;

      case 'MasterKeyChangeForce':
        metadata.masterKeyChangeForce = readNumberValue(reader);
        break;

      case 'MemoryProtection':
        processMemoryProtectionTag(reader.readFromCurrent(), metadata);
        break;

      case 'CustomIcons':
        metadata.customIcons = await parseCustomIconsTag(
          reader.readFromCurrent(),
        );
        break;

      case 'RecycleBinEnabled':
        metadata.recycleBinEnabled = readBooleanValue(reader);
        break;

      case 'RecycleBinUUID':
        metadata.recycleBinUuid = await readUuidValue(reader);
        break;

      case 'RecycleBinChanged':
        metadata.recycleBinChanged = readDateTimeValue(reader);
        break;

      case 'EntryTemplatesGroup':
        metadata.entryTemplatesGroup = await readUuidValue(reader);
        break;

      case 'EntryTemplatesGroupChanged':
        metadata.entryTemplatesGroupChanged = readDateTimeValue(reader);
        break;

      case 'LastSelectedGroup':
        metadata.lastSelectedGroup = await readUuidValue(reader);
        break;

      case 'LastTopVisibleGroup':
        metadata.lastTopVisibleGroup = await readUuidValue(reader);
        break;

      case 'HistoryMaxItems':
        metadata.historyMaxItems = readUnsignedNumberValue(reader);
        break;

      case 'HistoryMaxSize':
        metadata.historyMaxSize = readUnsignedNumberValue(reader);
        break;

      case 'Binaries':
        throw new Error('"Binaries" not implemented');

      case 'CustomData':
        metadata.customData = parseCustomDataTag(reader.readFromCurrent());
        break;

      case 'SettingsChanged':
        metadata.settingsChanged = readDateTimeValue(reader);
        break;

      default:
        reader.skipCurrentElement();
        break;
    }
  }

  if (!isMetadataComplete(metadata)) {
    throw new Error('Metadata is incomplete');
  }

  return metadata;
}
