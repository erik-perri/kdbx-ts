import { type CryptoCipher } from '../../crypto/types';
import Uint8ArrayWriter from '../../utilities/Uint8ArrayWriter';
import { type XmlReader } from '../../utilities/XmlReader';
import isProtectedValue from './isProtectedValue';

export default async function readBinaryValue(
  reader: XmlReader,
  randomStream?: CryptoCipher,
): Promise<Uint8Array> {
  const value = reader.readElementText();
  let data = Uint8ArrayWriter.fromBase64(value);

  if (isProtectedValue(reader.current)) {
    if (!randomStream) {
      throw new Error('Random stream is required to read protected values');
    }

    data = await randomStream.process(data);
  }

  return data;
}
