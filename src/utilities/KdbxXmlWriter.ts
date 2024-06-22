import type { CryptoCipher } from '../crypto/types';
import type { KdbxBinaryPoolValue } from '../types';
import gregorianTimestampFromDate from './gregorianTimestampFromDate';
import Uint8ArrayHelper from './Uint8ArrayHelper';
import XmlWriter from './XmlWriter';

export default class KdbxXmlWriter extends XmlWriter {
  constructor(
    private readonly cipher: CryptoCipher,
    private readonly binaryPool: KdbxBinaryPoolValue[],
  ) {
    super('\t');
  }

  writeString(name: string, value: string): void {
    if (value.length === 0) {
      this.writeEmptyElement(name);
    } else {
      this.writeTextElement(name, value);
    }
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

  writeDateTime(name: string, value: Date): void {
    const timestamp = gregorianTimestampFromDate(value);

    const timestampAsBytes = Uint8ArrayHelper.leftJustify(
      Uint8ArrayHelper.fromUInt64LE(timestamp),
      8,
    ).slice(0, 8);

    this.writeString(name, Buffer.from(timestampAsBytes).toString('base64'));
  }

  writeNumber(name: string, value: number): void {
    this.writeString(name, value.toString());
  }

  writeUuid(name: string, value: string, ensureCompliance: boolean): void {
    const uuidBytes = Uint8ArrayHelper.fromUuid(value, ensureCompliance);

    this.writeTextElement(name, Buffer.from(uuidBytes).toString('base64'));
  }
}
