import { type Metadata } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeCustomDataTag from './writeCustomDataTag';
import writeCustomIconsTag from './writeCustomIconsTag';
import writeMemoryProtectionTag from './writeMemoryProtectionTag';

export default function writeMetaTag(
  writer: KdbxXmlWriter,
  metadata: Metadata,
): void {
  if (isEmpty(metadata)) {
    return;
  }

  writer.writeStartElement('Meta');

  if (metadata.generator !== undefined) {
    writer.writeString('Generator', metadata.generator);
  }

  if (metadata.headerHash !== undefined) {
    writer.writeBinary('HeaderHash', metadata.headerHash);
  }

  if (metadata.name !== undefined) {
    writer.writeString('DatabaseName', metadata.name);
  }

  if (metadata.nameChanged !== undefined) {
    writer.writeDateTime('DatabaseNameChanged', metadata.nameChanged);
  }

  if (metadata.description !== undefined) {
    writer.writeString('DatabaseDescription', metadata.description);
  }

  if (metadata.descriptionChanged !== undefined) {
    writer.writeDateTime(
      'DatabaseDescriptionChanged',
      metadata.descriptionChanged,
    );
  }

  if (metadata.defaultUserName !== undefined) {
    writer.writeString('DefaultUserName', metadata.defaultUserName);
  }

  if (metadata.defaultUserNameChanged !== undefined) {
    writer.writeDateTime(
      'DefaultUserNameChanged',
      metadata.defaultUserNameChanged,
    );
  }

  if (metadata.maintenanceHistoryDays !== undefined) {
    writer.writeNumber(
      'MaintenanceHistoryDays',
      metadata.maintenanceHistoryDays,
    );
  }

  if (metadata.color !== undefined) {
    writer.writeColor('Color', metadata.color);
  }

  if (metadata.masterKeyChanged !== undefined) {
    writer.writeDateTime('MasterKeyChanged', metadata.masterKeyChanged);
  }

  if (metadata.masterKeyChangeRec !== undefined) {
    writer.writeNumber('MasterKeyChangeRec', metadata.masterKeyChangeRec);
  }

  if (metadata.masterKeyChangeForce !== undefined) {
    writer.writeNumber('MasterKeyChangeForce', metadata.masterKeyChangeForce);
  }

  if (metadata.memoryProtection !== undefined) {
    writeMemoryProtectionTag(writer, metadata.memoryProtection);
  }

  if (metadata.customIcons !== undefined) {
    writeCustomIconsTag(writer, metadata.customIcons);
  }

  if (metadata.recycleBinEnabled !== undefined) {
    writer.writeBoolean('RecycleBinEnabled', metadata.recycleBinEnabled);
  }

  if (metadata.recycleBinUuid !== undefined) {
    writer.writeUuid('RecycleBinUUID', metadata.recycleBinUuid, false);
  }

  if (metadata.recycleBinChanged !== undefined) {
    writer.writeDateTime('RecycleBinChanged', metadata.recycleBinChanged);
  }

  if (metadata.entryTemplatesGroup !== undefined) {
    writer.writeUuid(
      'EntryTemplatesGroup',
      metadata.entryTemplatesGroup,
      false,
    );
  }

  if (metadata.entryTemplatesGroupChanged !== undefined) {
    writer.writeDateTime(
      'EntryTemplatesGroupChanged',
      metadata.entryTemplatesGroupChanged,
    );
  }

  if (metadata.lastSelectedGroup !== undefined) {
    writer.writeUuid('LastSelectedGroup', metadata.lastSelectedGroup, false);
  }

  if (metadata.lastTopVisibleGroup !== undefined) {
    writer.writeUuid(
      'LastTopVisibleGroup',
      metadata.lastTopVisibleGroup,
      false,
    );
  }

  if (metadata.historyMaxItems !== undefined) {
    writer.writeNumber('HistoryMaxItems', metadata.historyMaxItems);
  }

  if (metadata.historyMaxSize !== undefined) {
    writer.writeNumber('HistoryMaxSize', metadata.historyMaxSize);
  }

  if (metadata.binaries !== undefined) {
    // TODO Verify binaries is not possible on v4+ and change this message
    throw new Error('"Binaries" not implemented');
  }

  if (metadata.customData !== undefined) {
    writeCustomDataTag(writer, metadata.customData, true);
  }

  if (metadata.settingsChanged !== undefined) {
    writer.writeDateTime('SettingsChanged', metadata.settingsChanged);
  }

  writer.writeEndElement();
}

function isEmpty(metadata: Metadata): boolean {
  return Object.keys(metadata).length === 0;
}
