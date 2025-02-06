import { type Element } from '@xmldom/xmldom';

import { type Metadata } from '../../types/database';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseCustomDataTag from './parseCustomDataTag';
import parseCustomIconsTag from './parseCustomIconsTag';
import parseMemoryProtectionTag from './parseMemoryProtectionTag';

export default async function parseMetaTag(
  reader: KdbxXmlReader,
  element: Element,
): Promise<Metadata> {
  reader.assertTag(element, 'Meta');

  const metadata: Metadata = {};

  for (const child of reader.children(element)) {
    switch (child.tagName) {
      case 'Generator':
        metadata.generator = reader.readStringValue(child);
        break;

      case 'HeaderHash':
        metadata.headerHash = await reader.readBinaryValue(child);
        break;

      case 'DatabaseName':
        metadata.name = reader.readStringValue(child);
        break;

      case 'DatabaseNameChanged':
        metadata.nameChanged = reader.readDateTimeValue(child);
        break;

      case 'DatabaseDescription':
        metadata.description = reader.readStringValue(child);
        break;

      case 'DatabaseDescriptionChanged':
        metadata.descriptionChanged = reader.readDateTimeValue(child);
        break;

      case 'DefaultUserName':
        metadata.defaultUserName = reader.readStringValue(child);
        break;

      case 'DefaultUserNameChanged':
        metadata.defaultUserNameChanged = reader.readDateTimeValue(child);
        break;

      case 'MaintenanceHistoryDays':
        metadata.maintenanceHistoryDays = reader.readNumberValue(child);
        break;

      case 'Color':
        metadata.color = reader.readColorValue(child);
        break;

      case 'MasterKeyChanged':
        metadata.masterKeyChanged = reader.readDateTimeValue(child);
        break;

      case 'MasterKeyChangeRec':
        metadata.masterKeyChangeRec = reader.readNumberValue(child);
        break;

      case 'MasterKeyChangeForce':
        metadata.masterKeyChangeForce = reader.readNumberValue(child);
        break;

      case 'MemoryProtection':
        metadata.memoryProtection = parseMemoryProtectionTag(reader, child);
        break;

      case 'CustomIcons':
        metadata.customIcons = await parseCustomIconsTag(reader, child);
        break;

      case 'RecycleBinEnabled':
        metadata.recycleBinEnabled = reader.readBooleanValue(child);
        break;

      case 'RecycleBinUUID':
        metadata.recycleBinUuid = await reader.readUuidValue(child);
        break;

      case 'RecycleBinChanged':
        metadata.recycleBinChanged = reader.readDateTimeValue(child);
        break;

      case 'EntryTemplatesGroup':
        metadata.entryTemplatesGroup = await reader.readUuidValue(child);
        break;

      case 'EntryTemplatesGroupChanged':
        metadata.entryTemplatesGroupChanged = reader.readDateTimeValue(child);
        break;

      case 'LastSelectedGroup':
        metadata.lastSelectedGroup = await reader.readUuidValue(child);
        break;

      case 'LastTopVisibleGroup':
        metadata.lastTopVisibleGroup = await reader.readUuidValue(child);
        break;

      case 'HistoryMaxItems':
        metadata.historyMaxItems = reader.readNumberValue(child);
        break;

      case 'HistoryMaxSize':
        metadata.historyMaxSize = reader.readNumberValue(child);
        break;

      case 'Binaries':
        // TODO Verify binaries is not possible on v4+ and change this message
        throw new Error('"Binaries" not implemented');

      case 'CustomData':
        metadata.customData = parseCustomDataTag(reader, child, true);
        break;

      case 'SettingsChanged':
        metadata.settingsChanged = reader.readDateTimeValue(child);
        break;

      default:
        throw new Error(
          `Unexpected tag "${child.tagName}" while parsing "${element.tagName}"`,
        );
    }
  }

  return metadata;
}
