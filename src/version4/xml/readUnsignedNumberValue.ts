import { type XmlReader } from '../../utilities/XmlReader';
import readNumberValue from './readNumberValue';

export default function readUnsignedNumberValue(
  reader: XmlReader,
  radix: number = 10,
): number {
  const value = readNumberValue(reader, radix);

  if (value < 0) {
    throw new Error(`Invalid unsigned number "${value}"`);
  }

  return value;
}
