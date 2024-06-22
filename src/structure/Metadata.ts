import type CustomDataWithTimes from './CustomDataWithTimes';
import type Icon from './Icon';
import type MemoryProtection from './MemoryProtection';
import { type Uuid } from './Uuid';

type Metadata = {
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
  //masterKeyChangeForceOnce?: boolean;
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

export type MetadataBinaries = Record<string, Uint8Array | undefined>;

export type MetadataCustomData = Record<
  string,
  CustomDataWithTimes | undefined
>;

export type MetadataCustomIcons = Record<Uuid, Icon | undefined>;

export default Metadata;
