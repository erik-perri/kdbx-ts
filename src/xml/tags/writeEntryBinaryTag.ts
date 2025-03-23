import type { Element } from '@xmldom/xmldom';

import { type EntryAttachment } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default function writeEntryBinaryTag(
  writer: KdbxXmlWriter,
  attachment: EntryAttachment,
): Element {
  const element = writer.createElement('Binary');

  element.appendChild(writer.writeString('Key', attachment.key));

  const value = writer.createElement('Value');
  value.setAttribute('Ref', attachment.ref);
  element.appendChild(value);

  return element;
}
