import type { XmlElement } from '../../utilities/XmlReader';

export default function isProtectedValue(element: XmlElement): boolean {
  return element.attributes.Protected?.toLowerCase() === 'true';
}
