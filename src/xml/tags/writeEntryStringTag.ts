import type { Element } from '@xmldom/xmldom';

import { type EntryAttribute } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';

export default async function writeEntryStringTag(
  writer: KdbxXmlWriter,
  attribute: EntryAttribute,
): Promise<Element> {
  const element = writer.createElement('String');

  element.appendChild(writer.writeString('Key', attribute.key));

  if (attribute.isProtected) {
    element.appendChild(
      await writer.writeProtectedString('Value', attribute.value),
    );
  } else {
    element.appendChild(writer.writeString('Value', attribute.value));
  }

  return element;
}
