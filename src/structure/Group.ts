import type TriState from '../enums/TriState';
import type CustomDataItem from './CustomDateTime';
import type Entry from './Entry';
import type TimeInfo from './TimeInfo';
import { type Uuid } from './Uuid';

type Group = {
  children?: Group[];
  customData?: Record<string, CustomDataItem | undefined>;
  customIcon?: Uuid;
  defaultAutoTypeSequence?: string;
  enableAutoType?: TriState;
  enableSearching?: TriState;
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

export default Group;
