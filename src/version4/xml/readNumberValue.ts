import { type XmlReader } from '../../utilities/XmlReader';

export default function readNumberValue(
  reader: XmlReader,
  radix: number = 10,
): number {
  const text = reader.readElementText();

  return parseInt(text, radix);
}
