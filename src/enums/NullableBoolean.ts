const NullableBoolean = {
  Inherit: -1,
  False: 0,
  True: 1,
} as const;

type NullableBoolean = (typeof NullableBoolean)[keyof typeof NullableBoolean];

export default NullableBoolean;
