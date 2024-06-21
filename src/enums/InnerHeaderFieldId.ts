const InnerHeaderFieldId = Object.freeze({
  EndOfHeader: 0,
  InnerEncryptionAlgorithm: 1,
  InnerEncryptionKey: 2,
  Binary: 3,
} as const);

type InnerHeaderFieldId =
  (typeof InnerHeaderFieldId)[keyof typeof InnerHeaderFieldId];

export default InnerHeaderFieldId;
