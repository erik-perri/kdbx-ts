import type AutoType from './AutoType';
import type CustomData from './CustomData';
import type EntryAttachment from './EntryAttachment';
import type EntryAttribute from './EntryAttribute';
import type TimeInfo from './TimeInfo';
import { type Uuid } from './Uuid';

type Entry = {
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

export default Entry;
