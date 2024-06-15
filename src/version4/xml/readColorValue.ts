import { type XmlReader } from '../../utilities/XmlReader';
import readStringValue from './readStringValue';

export default function readColorValue(reader: XmlReader): string {
  const colorString = readStringValue(reader);

  if (!colorString.length) {
    return colorString;
  }

  if (!colorString.match(/^#[0-f]{6}$/)) {
    throw new Error('Invalid color value');
  }

  return colorString;
}
