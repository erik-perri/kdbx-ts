import displayUuid from '../../utilities/displayUuid';
import { type XmlReader } from '../../utilities/XmlReader';
import readBinaryValue from './readBinaryValue';

export default async function readUuidValue(
  reader: XmlReader,
): Promise<string> {
  const data = await readBinaryValue(reader, undefined);

  if (data.byteLength !== 16) {
    throw new Error(
      `Unexpected UUID length. Expected 16 bytes, got ${data.byteLength}`,
    );
  }

  return displayUuid(data);
}
