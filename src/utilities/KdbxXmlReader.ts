import type { CryptoCipher } from '../crypto/types';
import TriState from '../enums/TriState';
import displayUuid from './displayUuid';
import isBase64 from './isBase64';
import Uint8ArrayHelper from './Uint8ArrayHelper';
import XmlReader from './XmlReader';

export default class KdbxXmlReader extends XmlReader {
  constructor(
    contents: string,
    private readonly randomStream: CryptoCipher,
  ) {
    super(contents);
  }

  createChildReader(contents: string): XmlReader {
    return new KdbxXmlReader(contents, this.randomStream);
  }

  isProtectedValue(): boolean {
    return this.current.attributes.Protected?.toLowerCase() === 'true';
  }

  async readBinaryValue(): Promise<Uint8Array> {
    const value = this.readElementText();
    let data = Uint8ArrayHelper.fromBase64(value);

    if (this.isProtectedValue()) {
      data = await this.randomStream.process(data);
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
      throw new Error('Non-encoded dates not implemented');
    }

    const data = Uint8ArrayHelper.leftJustify(
      Uint8ArrayHelper.fromBase64(value),
      8,
    ).slice(0, 8);

    const secondsSinceBc = Uint8ArrayHelper.toUInt64LE(data);

    if (
      secondsSinceBc < Number.MIN_SAFE_INTEGER ||
      secondsSinceBc > Number.MAX_SAFE_INTEGER
    ) {
      throw new Error(
        `Invalid date time found. Out of range "${secondsSinceBc}"`,
      );
    }

    const secondsSinceBcAsNumber = Number(secondsSinceBc);

    const date = new Date();
    date.setUTCFullYear(0, 0, 0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCSeconds(secondsSinceBcAsNumber);
    return date;
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

    const data = await this.randomStream.process(
      Uint8ArrayHelper.fromBase64(text),
    );
    return [Uint8ArrayHelper.toString(data), isProtected];
  }

  readStringValue(): string {
    if (this.current.isClose) {
      return '';
    }

    return this.readElementText();
  }

  readTriStateValue(): TriState {
    const value = this.readStringValue().toLowerCase();
    if (value === 'null') {
      return TriState.Inherit;
    } else if (value === 'true') {
      return TriState.Enable;
    } else if (value === 'false') {
      return TriState.Disable;
    }

    throw new Error(`Invalid TriState value "${value}"`);
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