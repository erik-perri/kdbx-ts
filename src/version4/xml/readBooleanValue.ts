import { type XmlReader } from '../../utilities/XmlReader';
import readStringValue from './readStringValue';

export default function readBooleanValue(reader: XmlReader): boolean {
  const value = readStringValue(reader);

  if (!value.length) {
    return false;
  }

  const valueAsLower = value.toLowerCase();

  if (valueAsLower === 'true') {
    return true;
  }

  if (valueAsLower === 'false') {
    return false;
  }

  throw new Error(`Invalid bool value "${value}"`);
}
