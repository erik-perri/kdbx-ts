import generateBlockHmacKey from '../crypto/generateBlockHmacKey';
import { type CryptoImplementation } from '../crypto/types';
import HashAlgorithm from '../enums/HashAlgorithm';
import type BufferReader from '../utilities/BufferReader';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';

export default async function readHmacHashedBlocks(
  crypto: CryptoImplementation,
  reader: BufferReader,
  key: Uint8Array,
): Promise<Uint8Array[]> {
  const blocks: Uint8Array[] = [];

  for (let blockIndex = 0; ; blockIndex++) {
    const expectedHmac = reader.readBytes(32);
    if (expectedHmac.byteLength !== 32) {
      throw new Error(
        `Invalid HMAC size. Expected 32 bytes, got ${expectedHmac.byteLength} bytes`,
      );
    }

    const blockLengthBytes = reader.readBytes(4);
    if (blockLengthBytes.byteLength !== 4) {
      throw new Error(
        `Invalid block length. Expected 4 bytes, got ${blockLengthBytes.byteLength} bytes`,
      );
    }

    const blockLength = Uint8ArrayHelper.toInt32LE(blockLengthBytes);
    if (blockLength < 0 || Number.isNaN(blockLength)) {
      throw new Error(
        'Invalid block size. Expected a number greater than or equal to 0',
      );
    }

    const buffer = reader.readBytes(blockLength);
    if (buffer.byteLength !== blockLength) {
      throw new Error(
        `Invalid block size. Expected ${blockLength}, read ${buffer.byteLength}`,
      );
    }

    const blockHmacKey = await generateBlockHmacKey(crypto, blockIndex, key);

    const hmac = await crypto.hmac(HashAlgorithm.Sha256, blockHmacKey, [
      Uint8ArrayHelper.fromUInt64LE(blockIndex),
      blockLengthBytes,
      buffer,
    ]);

    if (!Uint8ArrayHelper.areEqual(expectedHmac, hmac)) {
      throw new Error(`HMAC mismatch on block ${blockIndex}`);
    }

    blocks.push(buffer);

    if (blockLength === 0) {
      break;
    }
  }

  return blocks;
}
