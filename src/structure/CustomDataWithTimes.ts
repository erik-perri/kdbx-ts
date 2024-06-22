import type CustomData from './CustomData';

type CustomDataWithTimes = CustomData & {
  lastModified?: Date;
};

export default CustomDataWithTimes;
