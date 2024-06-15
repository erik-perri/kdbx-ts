import { type XmlReader } from '../../utilities/XmlReader';

export default function readStringValue(reader: XmlReader): string {
  if (reader.current.isClose) {
    return '';
  }

  return reader.readElementText();
}
