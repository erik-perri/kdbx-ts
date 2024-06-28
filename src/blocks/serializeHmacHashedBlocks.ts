import generateBlockHmacKey from '../crypto/generateBlockHmacKey';
import processHmac from '../crypto/processHmac';
import HashAlgorithm from '../enums/HashAlgorithm';
import Uint8ArrayHelper from '../utilities/Uint8ArrayHelper';

export default async function serializeHmacHashedBlocks(
  data: Uint8Array,
  key: Uint8Array,
): Promise<Uint8Array> {
  const chunks = chunkData(data, 1024 * 1024);

  // Add an empty block to signal the end of the data
  chunks.push(new Uint8Array(0));

  const buffers: Uint8Array[] = [];

  for (let blockIndex = 0; blockIndex < chunks.length; blockIndex++) {
    const chunk = chunks[blockIndex];
    const blockLengthBytes = Uint8ArrayHelper.fromUInt32LE(chunk.byteLength);

    const hmac = await processHmac(
      HashAlgorithm.Sha256,
      await generateBlockHmacKey(blockIndex, key),
      [Uint8ArrayHelper.fromUInt64LE(blockIndex), blockLengthBytes, chunk],
    );

    buffers.push(hmac);
    buffers.push(blockLengthBytes);
    buffers.push(chunk);
  }

  return Uint8Array.from(Buffer.concat(buffers));
}

function chunkData(data: Uint8Array, chunkSize: number): Uint8Array[] {
  const length = data.byteLength;
  const chunks = [];

  for (let i = 0; i < length; i += chunkSize) {
    const currentChunkSize = Math.min(chunkSize, length - i);
    chunks.push(data.slice(i, i + currentChunkSize));
  }

  return chunks;
}
