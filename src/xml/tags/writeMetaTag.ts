import { type Element } from '@xmldom/xmldom';

import { type Metadata } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeCustomDataTag from './writeCustomDataTag';
import writeCustomIconsTag from './writeCustomIconsTag';
import writeMemoryProtectionTag from './writeMemoryProtectionTag';

export default function writeMetaTag(
  writer: KdbxXmlWriter,
  metadata: Metadata,
): Element {
  const element = writer.createElement('Meta');

  if (metadata.generator !== undefined) {
    element.appendChild(writer.writeString('Generator', metadata.generator));
  }

  if (metadata.headerHash !== undefined) {
    element.appendChild(writer.writeBinary('HeaderHash', metadata.headerHash));
  }

  if (metadata.name !== undefined) {
    element.appendChild(writer.writeString('DatabaseName', metadata.name));
  }

  if (metadata.nameChanged !== undefined) {
    element.appendChild(
      writer.writeDateTime('DatabaseNameChanged', metadata.nameChanged),
    );
  }

  if (metadata.description !== undefined) {
    element.appendChild(
      writer.writeString('DatabaseDescription', metadata.description),
    );
  }

  if (metadata.descriptionChanged !== undefined) {
    element.appendChild(
      writer.writeDateTime(
        'DatabaseDescriptionChanged',
        metadata.descriptionChanged,
      ),
    );
  }

  if (metadata.defaultUserName !== undefined) {
    element.appendChild(
      writer.writeString('DefaultUserName', metadata.defaultUserName),
    );
  }

  if (metadata.defaultUserNameChanged !== undefined) {
    element.appendChild(
      writer.writeDateTime(
        'DefaultUserNameChanged',
        metadata.defaultUserNameChanged,
      ),
    );
  }

  if (metadata.maintenanceHistoryDays !== undefined) {
    element.appendChild(
      writer.writeNumber(
        'MaintenanceHistoryDays',
        metadata.maintenanceHistoryDays,
      ),
    );
  }

  if (metadata.color !== undefined) {
    element.appendChild(writer.writeColor('Color', metadata.color));
  }

  if (metadata.masterKeyChanged !== undefined) {
    element.appendChild(
      writer.writeDateTime('MasterKeyChanged', metadata.masterKeyChanged),
    );
  }

  if (metadata.masterKeyChangeRec !== undefined) {
    element.appendChild(
      writer.writeNumber('MasterKeyChangeRec', metadata.masterKeyChangeRec),
    );
  }

  if (metadata.masterKeyChangeForce !== undefined) {
    element.appendChild(
      writer.writeNumber('MasterKeyChangeForce', metadata.masterKeyChangeForce),
    );
  }

  if (metadata.memoryProtection !== undefined) {
    element.appendChild(
      writeMemoryProtectionTag(writer, metadata.memoryProtection),
    );
  }

  if (metadata.customIcons !== undefined) {
    element.appendChild(writeCustomIconsTag(writer, metadata.customIcons));
  }

  if (metadata.recycleBinEnabled !== undefined) {
    element.appendChild(
      writer.writeBoolean('RecycleBinEnabled', metadata.recycleBinEnabled),
    );
  }

  if (metadata.recycleBinUuid !== undefined) {
    element.appendChild(
      writer.writeUuid('RecycleBinUUID', metadata.recycleBinUuid, false),
    );
  }

  if (metadata.recycleBinChanged !== undefined) {
    element.appendChild(
      writer.writeDateTime('RecycleBinChanged', metadata.recycleBinChanged),
    );
  }

  if (metadata.entryTemplatesGroup !== undefined) {
    element.appendChild(
      writer.writeUuid(
        'EntryTemplatesGroup',
        metadata.entryTemplatesGroup,
        false,
      ),
    );
  }

  if (metadata.entryTemplatesGroupChanged !== undefined) {
    element.appendChild(
      writer.writeDateTime(
        'EntryTemplatesGroupChanged',
        metadata.entryTemplatesGroupChanged,
      ),
    );
  }

  if (metadata.lastSelectedGroup !== undefined) {
    element.appendChild(
      writer.writeUuid('LastSelectedGroup', metadata.lastSelectedGroup, false),
    );
  }

  if (metadata.lastTopVisibleGroup !== undefined) {
    element.appendChild(
      writer.writeUuid(
        'LastTopVisibleGroup',
        metadata.lastTopVisibleGroup,
        false,
      ),
    );
  }

  if (metadata.historyMaxItems !== undefined) {
    element.appendChild(
      writer.writeNumber('HistoryMaxItems', metadata.historyMaxItems),
    );
  }

  if (metadata.historyMaxSize !== undefined) {
    element.appendChild(
      writer.writeNumber('HistoryMaxSize', metadata.historyMaxSize),
    );
  }

  if (metadata.binaries !== undefined) {
    // TODO Verify binaries is not possible on v4+ and change this message
    throw new Error('"Binaries" not implemented');
  }

  if (metadata.customData !== undefined) {
    element.appendChild(writeCustomDataTag(writer, metadata.customData, true));
  }

  if (metadata.settingsChanged !== undefined) {
    element.appendChild(
      writer.writeDateTime('SettingsChanged', metadata.settingsChanged),
    );
  }

  return element;
}
