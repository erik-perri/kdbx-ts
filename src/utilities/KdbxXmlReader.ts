import type { CryptoCipher } from '../crypto/types';
import NullableBoolean from '../enums/NullableBoolean';
import type { KdbxBinaryPoolValue } from '../types';
import displayUuid from './displayUuid';
import isBase64 from './isBase64';
import Uint8ArrayHelper from './Uint8ArrayHelper';
import XmlReader from './XmlReader';

export default class KdbxXmlReader extends XmlReader {
  constructor(
    contents: string,
    private readonly cipher: CryptoCipher,
    private readonly binaryPool: KdbxBinaryPoolValue[],
  ) {
    super(contents);
  }

  createChildReader(contents: string): XmlReader {
    return new KdbxXmlReader(contents, this.cipher, this.binaryPool);
  }

  isProtectedValue(): boolean {
    return this.current.attributes.Protected?.toLowerCase() === 'true';
  }

  readBinaryPoolData(index: string): Uint8Array {
    const poolValue = this.binaryPool.find((value) => value.index === index);

    if (!poolValue) {
      throw new Error(`Binary pool value not found for index "${index}"`);
    }

    return poolValue.data;
  }

  async readBinaryValue(): Promise<Uint8Array> {
    const value = this.readElementText();
    let data = Uint8ArrayHelper.fromBase64(value);

    if (this.isProtectedValue()) {
      data = await this.cipher.process(data);
    }

    return data;
  }

  readBooleanValue(): boolean {
    const value = this.readStringValue();

    if (!value.length) {
      return false;
    }

    const valueAsLower = value.toLowerCase();

    if (valueAsLower === 'true') {
      return true;
    }

    if (valueAsLower === 'false') {
      return false;
    }

    throw new Error(`Invalid bool value "${value}"`);
  }

  readColorValue(): string {
    const colorString = this.readStringValue();

    if (!colorString.length) {
      return colorString;
    }

    if (!colorString.match(/^#[0-f]{6}$/)) {
      throw new Error('Invalid color value');
    }

    return colorString;
  }

  readDateTimeValue(): Date {
    const value = this.readStringValue();

    if (!isBase64(value)) {
      return this.readDateTimeFromIsoString(value, true);
    }

    return this.readDateTimeFromBase64(value);
  }

  private readDateTimeFromBase64(value: string): Date {
    const data = Uint8ArrayHelper.leftJustify(
      Uint8ArrayHelper.fromBase64(value),
      8,
    ).slice(0, 8);

    const julianSeconds = Uint8ArrayHelper.toUInt64LE(data);

    if (
      julianSeconds < Number.MIN_SAFE_INTEGER ||
      julianSeconds > Number.MAX_SAFE_INTEGER
    ) {
      throw new Error(
        `Invalid date time found. Out of range for Date seconds "${julianSeconds}"`,
      );
    }

    const julianSecondsAsNumber = Number(julianSeconds);

    const date = new Date();
    date.setUTCFullYear(0, 0, 0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCSeconds(julianSecondsAsNumber);
    return date;
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

  readNumberValue(radix: number = 10): number {
    const text = this.readElementText();

    return parseInt(text, radix);
  }

  async readPotentiallyProtectedStringValue(): Promise<[string, boolean]> {
    const isProtected = this.isProtectedValue();

    if (this.current.isClose) {
      return ['', isProtected];
    }

    const text = this.readElementText();
    if (!isProtected) {
      return [text, isProtected];
    }

    const data = await this.cipher.process(Uint8ArrayHelper.fromBase64(text));
    return [Uint8ArrayHelper.toString(data), isProtected];
  }

  readStringValue(): string {
    if (this.current.isClose) {
      return '';
    }

    return this.readElementText();
  }

  readNullableBoolean(): NullableBoolean {
    const value = this.readStringValue().toLowerCase();
    if (value === 'null') {
      return NullableBoolean.Inherit;
    } else if (value === 'true') {
      return NullableBoolean.True;
    } else if (value === 'false') {
      return NullableBoolean.False;
    }

    throw new Error(`Invalid NullableBoolean value "${value}"`);
  }

  readUnsignedNumberValue(radix: number = 10): number {
    const value = this.readNumberValue(radix);

    if (value < 0) {
      throw new Error(`Invalid unsigned number "${value}"`);
    }

    return value;
  }

  async readUuidValue(): Promise<string> {
    const data = await this.readBinaryValue();

    if (data.byteLength !== 16) {
      throw new Error(
        `Invalid UUID length. Expected 16 bytes, got ${data.byteLength}`,
      );
    }

    return displayUuid(data);
  }
}
