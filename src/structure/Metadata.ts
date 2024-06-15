import type CustomDataItem from './CustomDateTime';
import type Icon from './Icon';
import { type Uuid } from './Uuid';

type Metadata = {
  color: string;
  customData?: Record<string, CustomDataItem | undefined>;
  customIcons?: Record<Uuid, Icon | undefined>;
  defaultUserName: string;
  defaultUserNameChanged: Date;
  description: string;
  descriptionChanged: Date;
  entryTemplatesGroup: Uuid;
  entryTemplatesGroupChanged: Date;
  generator: string;
  headerHash?: Uint8Array;
  historyMaxItems: number;
  historyMaxSize: number;
  lastSelectedGroup: Uuid;
  lastTopVisibleGroup: Uuid;
  maintenanceHistoryDays: number;
  masterKeyChanged: Date;
  masterKeyChangeForce: number;
  masterKeyChangeRec: number;
  name: string;
  nameChanged: Date;
  protectNotes: boolean;
  protectPassword: boolean;
  protectTitle: boolean;
  protectURL: boolean;
  protectUserName: boolean;
  recycleBinChanged: Date;
  recycleBinEnabled?: boolean;
  recycleBinUuid: Uuid;
  settingsChanged: Date;
};

export default Metadata;
