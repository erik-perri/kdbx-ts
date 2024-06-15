import { type CryptoCipher } from '../../crypto/types';
import Uint8ArrayReader from '../../utilities/Uint8ArrayReader';
import Uint8ArrayWriter from '../../utilities/Uint8ArrayWriter';
import { type XmlReader } from '../../utilities/XmlReader';
import isProtectedValue from './isProtectedValue';

export default async function readPotentiallyProtectedStringValue(
  reader: XmlReader,
  randomStream: CryptoCipher,
): Promise<[string, boolean]> {
  const isProtected = isProtectedValue(reader.current);

  if (reader.current.isClose) {
    return ['', isProtected];
  }

  const text = reader.readElementText();
  if (!isProtected) {
    return [text, isProtected];
  }

  const data = await randomStream.process(Uint8ArrayWriter.fromBase64(text));
  return [Uint8ArrayReader.toString(data), isProtected];
}
