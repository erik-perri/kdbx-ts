import TriState from '../../enums/TriState';
import { type XmlReader } from '../../utilities/XmlReader';
import readStringValue from './readStringValue';

export default function readTriStateValue(reader: XmlReader): TriState {
  const value = readStringValue(reader).toLowerCase();
  if (value === 'null') {
    return TriState.Inherit;
  } else if (value === 'true') {
    return TriState.Enable;
  } else if (value === 'false') {
    return TriState.Disable;
  }

  throw new Error(`Invalid TriState value "${value}"`);
}
