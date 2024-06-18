// TODO Add CustomDataWithTime and split this up.
//      Entry and Group use without time, Meta uses with
type CustomDataItem = {
  key: string;
  value: string;
  lastModified?: Date;
};

export default CustomDataItem;
