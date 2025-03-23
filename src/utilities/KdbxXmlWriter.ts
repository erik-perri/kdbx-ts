import { type Document, type Element } from '@xmldom/xmldom';

import type { SymmetricCipher } from '../dependencies';
import NullableBoolean from '../enums/NullableBoolean';
import type { KdbxBinaryPoolValue } from '../types/format';
import gregorianTimestampFromDate from './gregorianTimestampFromDate';
import Uint8ArrayHelper from './Uint8ArrayHelper';

export default class KdbxXmlWriter {
  constructor(
    private readonly document: Document,
    private readonly binaryPool: KdbxBinaryPoolValue[] | undefined,
    private readonly streamCipher: SymmetricCipher,
  ) {
    //
  }

  public createElement(tagName: string): Element {
    return this.document.createElement(tagName);
  }

  public writeBinary(tagName: string, value: Uint8Array): Element {
    const valueAsBase64 = Buffer.from(value).toString('base64');

    return this.writeString(tagName, valueAsBase64);
  }

  public writeBoolean(name: string, value: boolean): Element {
    const valueAsString = value ? 'True' : 'False';

    return this.writeString(name, valueAsString);
  }

  public writeColor(name: string, value: string): Element {
    if (value.length && !value.match(/^#[0-f]{6}$/)) {
      throw new Error(`Invalid color value "${value}"`);
    }

    return this.writeString(name, value);
  }

  public writeDateTime(tagName: string, value: Date): Element {
    const timestamp = gregorianTimestampFromDate(value);

    const timestampAsBytes = Uint8ArrayHelper.leftJustify(
      Uint8ArrayHelper.fromUInt64LE(timestamp),
      8,
    ).slice(0, 8);

    return this.writeString(
      tagName,
      Buffer.from(timestampAsBytes).toString('base64'),
    );
  }

  public writeNullableBoolean(name: string, value: NullableBoolean): Element {
    if (value === NullableBoolean.True) {
      return this.writeString(name, 'true');
    } else if (value === NullableBoolean.False) {
      return this.writeString(name, 'false');
    } else {
      return this.writeString(name, 'null');
    }
  }

  public writeNumber(tagName: string, value: number): Element {
    return this.writeString(tagName, value.toString());
  }

  public async writeProtectedString(
    name: string,
    value: string,
  ): Promise<Element> {
    const element = this.createElement(name);

    element.setAttribute('Protected', 'True');

    if (value.length > 0) {
      const encryptedValue = await this.streamCipher.process(
        Uint8ArrayHelper.fromString(value),
      );

      element.textContent = Buffer.from(encryptedValue).toString('base64');
    }

    return element;
  }

  public writeString(tagName: string, value: string): Element {
    const element = this.createElement(tagName);

    element.textContent = value;

    return element;
  }

  public writeUuid(
    name: string,
    value: string,
    ensureCompliance: boolean,
  ): Element {
    const uuidBytes = Uint8ArrayHelper.fromUuid(value, ensureCompliance);

    return this.writeString(name, Buffer.from(uuidBytes).toString('base64'));
  }
}
