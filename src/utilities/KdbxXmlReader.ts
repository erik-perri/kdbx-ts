import { Element, Node } from '@xmldom/xmldom';

import type { SymmetricCipher } from '../dependencies';
import NullableBoolean from '../enums/NullableBoolean';
import type { KdbxBinaryPoolValue } from '../types/format';
import displayUuid from './displayUuid';
import gregorianTimestampToDate from './gregorianTimestampToDate';
import isBase64 from './isBase64';
import Uint8ArrayHelper from './Uint8ArrayHelper';

export default class KdbxXmlReader {
  public constructor(
    private readonly cipher: SymmetricCipher,
    private readonly binaryPool: KdbxBinaryPoolValue[] | undefined,
  ) {
    //
  }

  public assertTag(element: Element, tagName: string): void {
    if (element.tagName !== tagName) {
      throw new Error(
        `Expected element "${tagName}" but found "${element.tagName}"`,
      );
    }
  }

  public attribute(element: Element, name: string): string | undefined {
    const attribute = element.attributes.getNamedItem(name);

    return attribute?.value;
  }

  public *children(element: Element): Generator<Element> {
    for (const childNode of element.childNodes) {
      switch (childNode.nodeType) {
        case Node.TEXT_NODE:
          if (
            childNode.nodeValue !== null &&
            childNode.nodeValue.trim().length > 0
          ) {
            throw new Error(
              `Unexpected text content found: "${childNode.nodeValue}"`,
            );
          }
          break;

        case Node.ELEMENT_NODE:
          if (!(childNode instanceof Element)) {
            throw new Error(
              `Unexpected non-Element node found in "${element.tagName}"`,
            );
          }

          yield childNode;
          break;

        default:
          throw new Error(
            `Unexpected node type ${childNode.nodeType} found in "${element.tagName}"`,
          );
      }
    }
  }

  public async readBinaryValue(element: Element): Promise<Uint8Array> {
    const value = this.readStringValue(element);
    const data = Uint8ArrayHelper.fromBase64(value);

    if (this.isProtectedValue(element)) {
      return await this.cipher.process(data);
    }

    return data;
  }

  public readBinaryPoolData(index: string): Uint8Array {
    const poolValue = this.binaryPool?.find((value) => value.index === index);

    if (!poolValue) {
      throw new Error(`Binary pool value not found for index "${index}"`);
    }

    return poolValue.data;
  }

  public readBooleanValue(element: Element): boolean {
    const value = this.readStringValue(element);

    switch (value.toLowerCase()) {
      case 'true':
        return true;
      case 'false':
      case '':
        return false;
      default:
        throw new Error(`Invalid bool value "${value}"`);
    }
  }

  public readColorValue(element: Element): string {
    const colorString = this.readStringValue(element);

    if (!colorString.length) {
      return colorString;
    }

    if (!colorString.match(/^#[0-f]{6}$/)) {
      throw new Error(`Invalid color value "${colorString}"`);
    }

    return colorString;
  }

  public readDateTimeValue(element: Element): Date {
    const value = this.readStringValue(element);

    if (!isBase64(value)) {
      return this.readDateTimeFromIsoString(value, true);
    }

    return this.readDateTimeFromBase64(value);
  }

  public readNullableBoolean(element: Element): NullableBoolean {
    const value = this.readStringValue(element);

    switch (value.toLowerCase()) {
      case 'null':
        return NullableBoolean.Inherit;
      case 'true':
        return NullableBoolean.True;
      case 'false':
        return NullableBoolean.False;
      default:
        throw new Error(`Invalid NullableBoolean value "${value}"`);
    }
  }

  public readNumberValue(element: Element, radix: number = 10): number {
    const text = this.readStringValue(element);

    return parseInt(text, radix);
  }

  public async readPotentiallyProtectedStringValue(
    element: Element,
  ): Promise<[string, boolean]> {
    const isProtected = this.isProtectedValue(element);

    const text = this.readStringValue(element);

    if (!isProtected || text.length === 0) {
      return [text, isProtected];
    }

    const data = await this.cipher.process(Uint8ArrayHelper.fromBase64(text));

    return [Uint8ArrayHelper.toString(data), isProtected];
  }

  public readStringValue(element: Element): string {
    if (element.textContent === null) {
      throw new Error(`Text content is null for element "${element.tagName}".`);
    }

    return element.textContent;
  }

  public async readUuidValue(element: Element): Promise<string> {
    const data = await this.readBinaryValue(element);

    if (data.byteLength !== 16) {
      throw new Error(
        `Invalid UUID length. Expected 16 bytes, got ${data.byteLength}`,
      );
    }

    return displayUuid(data);
  }

  private readDateTimeFromBase64(value: string): Date {
    const data = Uint8ArrayHelper.leftJustify(
      Uint8ArrayHelper.fromBase64(value),
      8,
    ).slice(0, 8);

    const timestamp = Uint8ArrayHelper.toUInt64LE(data);

    if (
      timestamp < Number.MIN_SAFE_INTEGER ||
      timestamp > Number.MAX_SAFE_INTEGER
    ) {
      throw new Error(
        `Invalid date time found. Out of range for Date seconds "${timestamp}"`,
      );
    }

    const timestampAsNumber = Number(timestamp);

    return gregorianTimestampToDate(timestampAsNumber);
  }

  private readDateTimeFromIsoString(input: string, strictMode: boolean): Date {
    const date = new Date(input);

    if (!isNaN(date.getTime())) {
      return date;
    }

    if (strictMode) {
      throw new Error(
        `Unexpected date format. Expected ISO 8601 date string, got "${input}"`,
      );
    }

    return new Date();
  }

  private isProtectedValue(element: Element): boolean {
    const protectedAttribute = this.attribute(element, 'Protected');

    return protectedAttribute?.toLowerCase() === 'true';
  }
}
