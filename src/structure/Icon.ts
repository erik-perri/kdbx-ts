import { type Uuid } from './Uuid';

type Icon = {
  data: Uint8Array;
  lastModificationTime: Date;
  name: string;
  uuid: Uuid;
};

export default Icon;
