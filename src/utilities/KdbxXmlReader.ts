import { type Document, DOMParser, Element, Node } from '@xmldom/xmldom';

import type { SymmetricCipher } from '../dependencies';
import NullableBoolean from '../enums/NullableBoolean';
import type { KdbxBinaryPoolValue } from '../types/format';
import displayUuid from './displayUuid';
import gregorianTimestampToDate from './gregorianTimestampToDate';
import isBase64 from './isBase64';
import Uint8ArrayHelper from './Uint8ArrayHelper';

export default class KdbxXmlReader {
  private constructor(
    private readonly current: Element,
    private readonly document: Document,
    private readonly cipher: SymmetricCipher,
    private readonly binaryPool: KdbxBinaryPoolValue[] | undefined,
  ) {
    //
  }

  public static create(
    contents: string,
    cipher: SymmetricCipher,
    binaryPool: KdbxBinaryPoolValue[] | undefined,
  ): KdbxXmlReader {
    const document = new DOMParser().parseFromString(contents, 'text/xml');

    if (!document.documentElement) {
      throw new Error('Document has no root element.');
    }

    return new this(document.documentElement, document, cipher, binaryPool);
  }

  public get tagName(): string {
    return this.current.tagName;
  }

  public attribute(name: string): string | undefined {
    const attribute = this.current.attributes.getNamedItem(name);

    return attribute?.value;
  }

  public expect(tagName: string): void {
    if (this.current.tagName !== tagName) {
      throw new Error(
        `Expected element "${tagName}" but found "${this.current.tagName}"`,
      );
    }
  }

  public *elements(): Generator<KdbxXmlReader> {
    for (const childNode of this.current.childNodes) {
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
              `Unexpected non-Element node found in "${this.current.tagName}"`,
            );
          }

          yield new KdbxXmlReader(
            childNode,
            this.document,
            this.cipher,
            this.binaryPool,
          );
          break;

        default:
          throw new Error(
            `Unexpected node type ${childNode.nodeType} found in "${this.current.tagName}"`,
          );
      }
    }
  }

  async readBinaryValue(): Promise<Uint8Array> {
    const value = this.readStringValue();
    const data = Uint8ArrayHelper.fromBase64(value);

    if (this.isProtectedValue()) {
      return await this.cipher.process(data);
    }

    return data;
  }

  readBinaryPoolData(index: string): Uint8Array {
    const poolValue = this.binaryPool?.find((value) => value.index === index);

    if (!poolValue) {
      throw new Error(`Binary pool value not found for index "${index}"`);
    }

    return poolValue.data;
  }

  public readBooleanValue(): boolean {
    const value = this.readStringValue();

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

  public readColorValue(): string {
    const colorString = this.readStringValue();

    if (!colorString.length) {
      return colorString;
    }

    if (!colorString.match(/^#[0-f]{6}$/)) {
      throw new Error(`Invalid color value "${colorString}"`);
    }

    return colorString;
  }

  public readDateTimeValue(): Date {
    const value = this.readStringValue();

    if (!isBase64(value)) {
      return this.readDateTimeFromIsoString(value, true);
    }

    return this.readDateTimeFromBase64(value);
  }

  readNullableBoolean(): NullableBoolean {
    const value = this.readStringValue();

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

  public readNumberValue(radix: number = 10): number {
    const text = this.readStringValue();

    return parseInt(text, radix);
  }

  async readPotentiallyProtectedStringValue(): Promise<[string, boolean]> {
    const isProtected = this.isProtectedValue();

    const text = this.readStringValue();

    if (!isProtected || text.length === 0) {
      return [text, isProtected];
    }

    const data = await this.cipher.process(Uint8ArrayHelper.fromBase64(text));

    return [Uint8ArrayHelper.toString(data), isProtected];
  }

  public readStringValue(): string {
    if (this.current.textContent === null) {
      throw new Error(
        `Text content is null for element "${this.current.tagName}".`,
      );
    }

    return this.current.textContent;
  }

  public async readUuidValue(): Promise<string> {
    const data = await this.readBinaryValue();

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

  private isProtectedValue(): boolean {
    const protectedAttribute = this.attribute('Protected');

    return protectedAttribute?.toLowerCase() === 'true';
  }
}
