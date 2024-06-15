const TriState = Object.freeze({
  Inherit: -1,
  Enable: 1,
  Disable: 0,
} as const);

type TriState = (typeof TriState)[keyof typeof TriState];

export default TriState;
