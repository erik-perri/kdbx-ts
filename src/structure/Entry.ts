import type AutoTypeAssociation from './AutoTypeAssociation';
import type CustomDataItem from './CustomDateTime';
import type TimeInfo from './TimeInfo';
import { type Uuid } from './Uuid';

type Entry = {
  attachments?: Record<string, Uint8Array>;
  attributes: Record<string, string | undefined>;
  autoTypeAssociations?: AutoTypeAssociation[];
  autoTypeEnabled: boolean;
  autoTypeObfuscation: number;
  backgroundColor: string;
  customData?: Record<string, CustomDataItem | undefined>;
  customIcon?: Uuid;
  defaultAutoTypeSequence: string;
  foregroundColor: string;
  history?: Entry[];
  iconNumber: number;
  overrideURL: string;
  previousParentGroup?: Uuid;
  protectedAttributes: string[];
  qualityCheck?: boolean;
  tags: string;
  timeInfo: TimeInfo;
  uuid: Uuid;
};

export default Entry;
