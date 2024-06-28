import { type SymmetricCipher } from '../dependencies';
import NullableBoolean from '../enums/NullableBoolean';
import type { KdbxBinaryPoolValue } from '../types/format';
import gregorianTimestampFromDate from './gregorianTimestampFromDate';
import Uint8ArrayHelper from './Uint8ArrayHelper';
import XmlWriter from './XmlWriter';

export default class KdbxXmlWriter extends XmlWriter {
  constructor(
    private readonly cipher: SymmetricCipher,
    private readonly binaryPool: KdbxBinaryPoolValue[],
  ) {
    super('\t');
  }

  writeBinary(name: string, value: Uint8Array): void {
    const valueAsBase64 = Buffer.from(value).toString('base64');

    this.writeTextElement(name, valueAsBase64);
  }

  writeBoolean(name: string, value: boolean): void {
    if (value) {
      this.writeString(name, 'True');
    } else {
      this.writeString(name, 'False');
    }
  }

  writeColor(name: string, value: string): void {
    if (value.length && !value.match(/^#[0-f]{6}$/)) {
      throw new Error(`Invalid color value "${value}"`);
    }

    this.writeString(name, value);
  }

  writeDateTime(name: string, value: Date): void {
    const timestamp = gregorianTimestampFromDate(value);

    const timestampAsBytes = Uint8ArrayHelper.leftJustify(
      Uint8ArrayHelper.fromUInt64LE(timestamp),
      8,
    ).slice(0, 8);

    this.writeString(name, Buffer.from(timestampAsBytes).toString('base64'));
  }

  writeNullableBoolean(name: string, value: NullableBoolean): void {
    if (value === NullableBoolean.True) {
      this.writeString(name, 'true');
    } else if (value === NullableBoolean.False) {
      this.writeString(name, 'false');
    } else {
      this.writeString(name, 'null');
    }
  }

  writeNumber(name: string, value: number): void {
    this.writeString(name, value.toString());
  }

  async writeProtectedString(name: string, value: string): Promise<void> {
    this.writeStartElement(name);

    this.writeAttribute('Protected', 'True');

    if (value.length > 0) {
      const encryptedValue = await this.cipher.process(
        Uint8ArrayHelper.fromString(value),
      );

      const encryptedValueAsBase64 =
        Buffer.from(encryptedValue).toString('base64');

      this.writeCharacters(encryptedValueAsBase64);
    }

    this.writeEndElement(false);
  }

  writeString(name: string, value: string): void {
    if (value.length === 0) {
      this.writeEmptyElement(name);
    } else {
      this.writeTextElement(name, value);
    }
  }

  writeUuid(name: string, value: string, ensureCompliance: boolean): void {
    const uuidBytes = Uint8ArrayHelper.fromUuid(value, ensureCompliance);

    this.writeTextElement(name, Buffer.from(uuidBytes).toString('base64'));
  }
}
