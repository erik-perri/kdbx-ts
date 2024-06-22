type EntryAttachment = {
  // TODO Decide where we want this between here and header.binaryPool
  data: Uint8Array;
  key: string;
  ref: string;
};

export default EntryAttachment;
