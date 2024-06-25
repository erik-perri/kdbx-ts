import type NullableBoolean from '../enums/NullableBoolean';

export type Database = {
  metadata: Metadata;
  root: DatabaseRoot;
};

export type Metadata = {
  binaries?: MetadataBinaries;
  color?: string;
  customData?: MetadataCustomData;
  customIcons?: MetadataCustomIcons;
  defaultUserName?: string;
  defaultUserNameChanged?: Date;
  description?: string;
  descriptionChanged?: Date;
  entryTemplatesGroup?: Uuid;
  entryTemplatesGroupChanged?: Date;
  generator?: string;
  headerHash?: Uint8Array;
  historyMaxItems?: number;
  historyMaxSize?: number;
  lastSelectedGroup?: Uuid;
  lastTopVisibleGroup?: Uuid;
  maintenanceHistoryDays?: number;
  masterKeyChangeForce?: number;
  //masterKeyChangeForceOnce?: boolean; TODO
  masterKeyChangeRec?: number;
  masterKeyChanged?: Date;
  memoryProtection?: MemoryProtection;
  name?: string;
  nameChanged?: Date;
  recycleBinChanged?: Date;
  recycleBinEnabled?: boolean;
  recycleBinUuid?: Uuid;
  settingsChanged?: Date;
};

export type Uuid = string;

export type MetadataBinaries = Record<string, Uint8Array | undefined>;

export type MetadataCustomData = Record<
  string,
  CustomDataWithTimes | undefined
>;

export type CustomData = {
  key: string;
  value: string;
};

export type CustomDataWithTimes = CustomData & {
  lastModified?: Date;
};

export type MetadataCustomIcons = Record<Uuid, Icon | undefined>;

export type Icon = {
  data: Uint8Array;
  lastModificationTime?: Date;
  name?: string;
  uuid: Uuid;
};

export type MemoryProtection = {
  protectTitle?: boolean;
  protectUserName?: boolean;
  protectPassword?: boolean;
  protectURL?: boolean;
  protectNotes?: boolean;
};

export type DatabaseRoot = {
  group: Group;
  deletedObjects?: DeletedObject[];
};

export type Group = {
  children?: Group[];
  customData?: Record<string, CustomData | undefined>;
  customIcon?: Uuid;
  defaultAutoTypeSequence?: string;
  enableAutoType?: NullableBoolean;
  enableSearching?: NullableBoolean;
  entries?: Entry[];
  iconNumber?: number;
  isExpanded?: boolean;
  lastTopVisibleEntry?: Uuid;
  name?: string;
  notes?: string;
  previousParentGroup?: Uuid;
  tags?: string;
  timeInfo?: TimeInfo;
  uuid: Uuid;
};
export type DeletedObject = {
  uuid: Uuid;
  deletionTime: Date;
};

export type Entry = {
  attachments?: Record<string, EntryAttachment | undefined>;
  attributes?: Record<string, EntryAttribute | undefined>;
  autoType?: AutoType;
  backgroundColor?: string;
  customData?: Record<string, CustomData | undefined>;
  customIcon?: Uuid;
  foregroundColor?: string;
  history?: Entry[];
  iconNumber?: number;
  overrideURL?: string;
  previousParentGroup?: Uuid;
  qualityCheck?: boolean;
  tags?: string;
  timeInfo?: TimeInfo;
  uuid: Uuid;
};

export type EntryAttachment = {
  // TODO Decide where we want this between here and header.binaryPool
  data: Uint8Array;
  key: string;
  ref: string;
};

export type EntryAttribute = {
  isProtected: boolean;
  key: string;
  value: string;
};

export type TimeInfo = {
  creationTime?: Date;
  expires?: boolean;
  expiryTime?: Date;
  lastAccessTime?: Date;
  lastModificationTime?: Date;
  locationChanged?: Date;
  usageCount?: number;
};

export type AutoType = {
  enabled?: boolean;
  /**
   * 0: No obfuscation.
   * 1: Two-channel auto-type obfuscation.
   */
  dataTransferObfuscation?: number;
  defaultSequence?: string;
  associations?: AutoTypeAssociation[];
};

export type AutoTypeAssociation = {
  window: string;
  sequence: string;
};
