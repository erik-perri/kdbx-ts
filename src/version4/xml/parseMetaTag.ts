import type Metadata from '../../structure/Metadata';
import type KdbxXmlReader from '../../utilities/KdbxXmlReader';
import parseCustomDataTag from './parseCustomDataTag';
import parseCustomIconsTag from './parseCustomIconsTag';
import processMemoryProtectionTag from './processMemoryProtectionTag';

export default async function parseMetaTag(
  reader: KdbxXmlReader,
): Promise<Metadata> {
  reader.assertOpenedTagOf('Meta');

  const metadata: Partial<Metadata> = {};

  while (reader.readNextStartElement()) {
    switch (reader.current.name) {
      case 'Generator':
        metadata.generator = reader.readStringValue();
        break;

      case 'HeaderHash':
        metadata.headerHash = await reader.readBinaryValue();
        break;

      case 'DatabaseName':
        metadata.name = reader.readStringValue();
        break;

      case 'DatabaseNameChanged':
        metadata.nameChanged = reader.readDateTimeValue();
        break;

      case 'DatabaseDescription':
        metadata.description = reader.readStringValue();
        break;

      case 'DatabaseDescriptionChanged':
        metadata.descriptionChanged = reader.readDateTimeValue();
        break;

      case 'DefaultUserName':
        metadata.defaultUserName = reader.readStringValue();
        break;

      case 'DefaultUserNameChanged':
        metadata.defaultUserNameChanged = reader.readDateTimeValue();
        break;

      case 'MaintenanceHistoryDays':
        metadata.maintenanceHistoryDays = reader.readNumberValue();
        break;

      case 'Color':
        metadata.color = reader.readColorValue();
        break;

      case 'MasterKeyChanged':
        metadata.masterKeyChanged = reader.readDateTimeValue();
        break;

      case 'MasterKeyChangeRec':
        metadata.masterKeyChangeRec = reader.readNumberValue();
        break;

      case 'MasterKeyChangeForce':
        metadata.masterKeyChangeForce = reader.readNumberValue();
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
        metadata.recycleBinEnabled = reader.readBooleanValue();
        break;

      case 'RecycleBinUUID':
        metadata.recycleBinUuid = await reader.readUuidValue();
        break;

      case 'RecycleBinChanged':
        metadata.recycleBinChanged = reader.readDateTimeValue();
        break;

      case 'EntryTemplatesGroup':
        metadata.entryTemplatesGroup = await reader.readUuidValue();
        break;

      case 'EntryTemplatesGroupChanged':
        metadata.entryTemplatesGroupChanged = reader.readDateTimeValue();
        break;

      case 'LastSelectedGroup':
        metadata.lastSelectedGroup = await reader.readUuidValue();
        break;

      case 'LastTopVisibleGroup':
        metadata.lastTopVisibleGroup = await reader.readUuidValue();
        break;

      case 'HistoryMaxItems':
        metadata.historyMaxItems = reader.readUnsignedNumberValue();
        break;

      case 'HistoryMaxSize':
        metadata.historyMaxSize = reader.readUnsignedNumberValue();
        break;

      case 'Binaries':
        throw new Error('"Binaries" not implemented');

      case 'CustomData':
        metadata.customData = parseCustomDataTag(reader.readFromCurrent());
        break;

      case 'SettingsChanged':
        metadata.settingsChanged = reader.readDateTimeValue();
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

function isMetadataComplete(item: Partial<Metadata>): item is Metadata {
  return (
    item.color !== undefined &&
    item.defaultUserName !== undefined &&
    item.defaultUserNameChanged !== undefined &&
    item.description !== undefined &&
    item.descriptionChanged !== undefined &&
    item.entryTemplatesGroup !== undefined &&
    item.entryTemplatesGroupChanged !== undefined &&
    item.generator !== undefined &&
    item.historyMaxItems !== undefined &&
    item.historyMaxSize !== undefined &&
    item.lastSelectedGroup !== undefined &&
    item.lastTopVisibleGroup !== undefined &&
    item.maintenanceHistoryDays !== undefined &&
    item.masterKeyChanged !== undefined &&
    item.masterKeyChangeForce !== undefined &&
    item.masterKeyChangeRec !== undefined &&
    item.name !== undefined &&
    item.nameChanged !== undefined &&
    item.protectNotes !== undefined &&
    item.protectPassword !== undefined &&
    item.protectTitle !== undefined &&
    item.protectURL !== undefined &&
    item.protectUserName !== undefined &&
    item.recycleBinChanged !== undefined &&
    item.recycleBinUuid !== undefined &&
    item.settingsChanged !== undefined
  );
}
