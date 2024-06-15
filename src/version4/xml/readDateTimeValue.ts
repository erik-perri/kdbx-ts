import isBase64 from '../../utilities/isBase64';
import Uint8ArrayReader from '../../utilities/Uint8ArrayReader';
import Uint8ArrayWriter from '../../utilities/Uint8ArrayWriter';
import { type XmlReader } from '../../utilities/XmlReader';
import readStringValue from './readStringValue';

export default function readDateTimeValue(reader: XmlReader): Date {
  const value = readStringValue(reader);

  if (isBase64(value)) {
    const data = Uint8ArrayWriter.leftJustify(
      Uint8ArrayWriter.fromBase64(value),
      8,
    ).slice(0, 8);

    const secondsSinceBc = Uint8ArrayReader.toUInt64LE(data);

    if (
      secondsSinceBc < Number.MIN_SAFE_INTEGER ||
      secondsSinceBc > Number.MAX_SAFE_INTEGER
    ) {
      throw new Error(
        `Invalid date time found. Out of range "${secondsSinceBc}"`,
      );
    }

    const secondsSinceBcAsNumber = Number(secondsSinceBc);

    const date = new Date();
    date.setUTCFullYear(0, 0, 0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCSeconds(secondsSinceBcAsNumber);
    return date;
  }

  throw new Error('Non-encoded dates not implemented');
}
