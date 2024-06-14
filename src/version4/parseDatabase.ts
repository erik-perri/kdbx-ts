import type { KdbxHeader } from '../header/types';
import type Uint8ArrayCursorReader from '../utilities/Uint8ArrayCursorReader';
import parseHeader from './parseHeader';

export type KdbxDatabase4 = {
  header: KdbxHeader;
};

export default async function parseDatabase(
  reader: Uint8ArrayCursorReader,
): Promise<KdbxDatabase4> {
  const header = parseHeader(reader);

  return Promise.resolve({
    header,
  });
}
