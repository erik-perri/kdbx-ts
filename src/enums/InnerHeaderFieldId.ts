const InnerHeaderFieldId = Object.freeze({
  End: 0,
  InnerStreamMode: 1,
  InnerStreamKey: 2,
  Binary: 3,
} as const);

type InnerHeaderFieldId =
  (typeof InnerHeaderFieldId)[keyof typeof InnerHeaderFieldId];

export default InnerHeaderFieldId;
