import type CustomDataItem from './CustomDateTime';
import type Icon from './Icon';
import type MemoryProtection from './MemoryProtection';
import { type Uuid } from './Uuid';

type Metadata = {
  color?: string;
  customData?: Record<string, CustomDataItem | undefined>;
  customIcons?: Record<Uuid, Icon | undefined>;
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
  //masterKetChangeForceOnce?: boolean;
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

export default Metadata;
