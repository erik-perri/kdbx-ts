import { type Metadata } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseCustomDataTag from './parseCustomDataTag';
import parseCustomIconsTag from './parseCustomIconsTag';
import parseMemoryProtectionTag from './parseMemoryProtectionTag';

export default async function parseMetaTag(
  reader: KdbxXmlReader,
): Promise<Metadata> {
  reader.expect('Meta');

  const metadata: Metadata = {};

  for (const element of reader.elements()) {
    switch (element.tagName) {
      case 'Generator':
        metadata.generator = element.readStringValue();
        break;

      case 'HeaderHash':
        metadata.headerHash = await element.readBinaryValue();
        break;

      case 'DatabaseName':
        metadata.name = element.readStringValue();
        break;

      case 'DatabaseNameChanged':
        metadata.nameChanged = element.readDateTimeValue();
        break;

      case 'DatabaseDescription':
        metadata.description = element.readStringValue();
        break;

      case 'DatabaseDescriptionChanged':
        metadata.descriptionChanged = element.readDateTimeValue();
        break;

      case 'DefaultUserName':
        metadata.defaultUserName = element.readStringValue();
        break;

      case 'DefaultUserNameChanged':
        metadata.defaultUserNameChanged = element.readDateTimeValue();
        break;

      case 'MaintenanceHistoryDays':
        metadata.maintenanceHistoryDays = element.readNumberValue();
        break;

      case 'Color':
        metadata.color = element.readColorValue();
        break;

      case 'MasterKeyChanged':
        metadata.masterKeyChanged = element.readDateTimeValue();
        break;

      case 'MasterKeyChangeRec':
        metadata.masterKeyChangeRec = element.readNumberValue();
        break;

      case 'MasterKeyChangeForce':
        metadata.masterKeyChangeForce = element.readNumberValue();
        break;

      case 'MemoryProtection':
        metadata.memoryProtection = parseMemoryProtectionTag(element);
        break;

      case 'CustomIcons':
        metadata.customIcons = await parseCustomIconsTag(element);
        break;

      case 'RecycleBinEnabled':
        metadata.recycleBinEnabled = element.readBooleanValue();
        break;

      case 'RecycleBinUUID':
        metadata.recycleBinUuid = await element.readUuidValue();
        break;

      case 'RecycleBinChanged':
        metadata.recycleBinChanged = element.readDateTimeValue();
        break;

      case 'EntryTemplatesGroup':
        metadata.entryTemplatesGroup = await element.readUuidValue();
        break;

      case 'EntryTemplatesGroupChanged':
        metadata.entryTemplatesGroupChanged = element.readDateTimeValue();
        break;

      case 'LastSelectedGroup':
        metadata.lastSelectedGroup = await element.readUuidValue();
        break;

      case 'LastTopVisibleGroup':
        metadata.lastTopVisibleGroup = await element.readUuidValue();
        break;

      case 'HistoryMaxItems':
        metadata.historyMaxItems = element.readNumberValue();
        break;

      case 'HistoryMaxSize':
        metadata.historyMaxSize = element.readNumberValue();
        break;

      case 'Binaries':
        // TODO Verify binaries is not possible on v4+ and change this message
        throw new Error('"Binaries" not implemented');

      case 'CustomData':
        metadata.customData = parseCustomDataTag(element, true);
        break;

      case 'SettingsChanged':
        metadata.settingsChanged = element.readDateTimeValue();
        break;

      default:
        throw new Error(
          `Unexpected tag "${element.tagName}" while parsing "${reader.tagName}"`,
        );
    }
  }

  return metadata;
}
