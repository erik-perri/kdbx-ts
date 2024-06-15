import type AutoTypeAssociation from './AutoTypeAssociation';
import type CustomDataItem from './CustomDateTime';
import type Database from './Database';
import type DeletedObject from './DeletedObject';
import type Entry from './Entry';
import type Group from './Group';
import type Icon from './Icon';
import type Metadata from './Metadata';
import type TimeInfo from './TimeInfo';

export function isAutoTypeAssociationComplete(
  association: Partial<AutoTypeAssociation>,
): association is AutoTypeAssociation {
  return association.window !== undefined && association.sequence !== undefined;
}

export function isCustomDataItemComplete(
  item: Partial<CustomDataItem>,
): item is CustomDataItem {
  return item.key !== undefined && item.value !== undefined;
}

export function isDatabaseComplete(
  database: Partial<Database>,
): database is Database {
  return (
    database.metadata !== undefined &&
    database.rootGroup !== undefined &&
    database.deletedObjects !== undefined
  );
}

export function isDeletedObjectComplete(
  deletedObject: Partial<DeletedObject>,
): deletedObject is DeletedObject {
  return (
    deletedObject.uuid !== undefined && deletedObject.deletionTime !== undefined
  );
}

export function isEntryComplete(entry: Partial<Entry>): entry is Entry {
  return (
    entry.attributes !== undefined &&
    entry.autoTypeEnabled !== undefined &&
    entry.autoTypeObfuscation !== undefined &&
    entry.backgroundColor !== undefined &&
    entry.defaultAutoTypeSequence !== undefined &&
    entry.foregroundColor !== undefined &&
    entry.iconNumber !== undefined &&
    entry.overrideURL !== undefined &&
    entry.protectedAttributes !== undefined &&
    entry.tags !== undefined &&
    entry.timeInfo !== undefined &&
    entry.uuid !== undefined
  );
}

export function isGroupComplete(group: Partial<Group>): group is Group {
  return (
    group.defaultAutoTypeSequence !== undefined &&
    group.enableAutoType !== undefined &&
    group.enableSearching !== undefined &&
    group.iconNumber !== undefined &&
    group.isExpanded !== undefined &&
    group.lastTopVisibleEntry !== undefined &&
    group.name !== undefined &&
    group.notes !== undefined &&
    group.timeInfo !== undefined &&
    group.uuid !== undefined
  );
}

export function isIconComplete(icon: Partial<Icon>): icon is Icon {
  return (
    icon.data !== undefined &&
    icon.lastModificationTime !== undefined &&
    icon.name !== undefined &&
    icon.uuid !== undefined
  );
}

export function isMetadataComplete(item: Partial<Metadata>): item is Metadata {
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

export function isTimeInfoComplete(item: Partial<TimeInfo>): item is TimeInfo {
  return (
    item.creationTime !== undefined &&
    item.expires !== undefined &&
    item.expiryTime !== undefined &&
    item.lastAccessTime !== undefined &&
    item.lastModificationTime !== undefined &&
    item.locationChanged !== undefined &&
    item.usageCount !== undefined
  );
}
