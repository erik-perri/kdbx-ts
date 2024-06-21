import Uint8ArrayHelper from '../../utilities/Uint8ArrayHelper';

export default function deserializeEndOfHeaderValue(
  data: Uint8Array,
): Uint8Array {
  if (data.byteLength !== 4) {
    throw new Error(
      `Invalid end of header field data length. Expected 4 bytes, got ${data.byteLength}`,
    );
  }

  if (
    !Uint8ArrayHelper.areEqual(data, new Uint8Array([0x0d, 0x0a, 0x0d, 0x0a]))
  ) {
    throw new Error(`Unexpected end of header field data`);
  }

  return data;
}
