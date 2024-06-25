import generateBlockHmacKey from '../crypto/generateBlockHmacKey';
import HashAlgorithm from '../enums/HashAlgorithm';
import { type CryptoImplementation } from '../types/crypto';
import type BufferReader from '../utilities/BufferReader';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';

export default async function readHmacHashedBlocks(
  crypto: CryptoImplementation,
  reader: BufferReader,
  key: Uint8Array,
): Promise<Uint8Array> {
  const blocks: Uint8Array[] = [];

  // The minimum size should be 36 bytes (32 bytes for the HMAC and 4 bytes for the block length).
  // It would not be a valid database, but it would be valid HMAC hashed blocks.
  if (reader.byteLength < 36) {
    throw new Error(
      `Invalid HMAC hashed blocks data length. Expected at least 36 bytes, got ${reader.byteLength}`,
    );
  }

  for (let blockIndex = 0; ; blockIndex++) {
    const expectedHmac = reader.readBytes(32);

    const blockLengthBytes = reader.readBytes(4);

    const blockLength = Uint8ArrayHelper.toInt32LE(blockLengthBytes);
    if (blockLength < 0) {
      throw new Error(
        `Invalid block size. Expected a number greater than or equal to 0, got ${blockLength}`,
      );
    }

    const buffer = reader.readBytes(blockLength);

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

  return Uint8Array.from(Buffer.concat(blocks));
}
