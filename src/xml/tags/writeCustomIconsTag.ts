import { type Element } from '@xmldom/xmldom';

import { type MetadataCustomIcons } from '../../types/database';
import type KdbxXmlWriter from '../../utilities/KdbxXmlWriter';
import writeIconTag from './writeIconTag';

export default function writeCustomIconsTag(
  writer: KdbxXmlWriter,
  customIcons: MetadataCustomIcons,
): Element {
  const element = writer.createElement('CustomIcons');

  for (const icon of Object.values(customIcons)) {
    if (icon === undefined) {
      continue;
    }

    element.appendChild(writeIconTag(writer, icon));
  }

  return element;
}
