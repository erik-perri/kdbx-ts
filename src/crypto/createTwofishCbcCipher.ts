import { decrypt, encrypt, makeSession, type Session } from 'twofish-ts';

import { type SymmetricCipher } from '../dependencies';
import SymmetricCipherDirection from '../enums/SymmetricCipherDirection';

export default async function createTwofishCbcCipher(
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  initialIv: Uint8Array,
): Promise<SymmetricCipher> {
  let session: Session | undefined = makeSession(key);
  let buffer = new Uint8Array(0);
  const iv = initialIv;
  const blockSize = 16;

  function xorBlock(block: Uint8Array, iv: Uint8Array): void {
    for (let i = 0; i < block.length; i++) {
      block[i] ^= iv[i];
    }
  }

  return Promise.resolve({
    process(data): Promise<Uint8Array> {
      if (!session) {
        throw new Error('Cipher is no longer available');
      }

      const combinedData = new Uint8Array([...buffer, ...data]);
      const blockCount = Math.floor(combinedData.length / blockSize);
      const processedData = new Uint8Array(blockCount * blockSize);

      let previousBlock = iv;

      for (let i = 0; i < blockCount; i++) {
        const offset = i * blockSize;
        const block = combinedData.slice(offset, offset + blockSize);
        const outputBlock = new Uint8Array(blockSize);

        if (direction === SymmetricCipherDirection.Encrypt) {
          xorBlock(block, previousBlock);
          encrypt(block, 0, outputBlock, 0, session);
          previousBlock = outputBlock;
        } else {
          decrypt(block, 0, outputBlock, 0, session);
          xorBlock(outputBlock, previousBlock);
          previousBlock = block;
        }

        processedData.set(outputBlock, offset);
      }

      buffer = combinedData.slice(blockCount * blockSize);

      return Promise.resolve(processedData);
    },
    async finish(data): Promise<Uint8Array> {
      const remainingData = new Uint8Array([...buffer, ...data]);

      let processedData: Uint8Array;

      if (direction === SymmetricCipherDirection.Encrypt) {
        const paddingLength = blockSize - (remainingData.length % blockSize);
        const paddedData = new Uint8Array([
          ...remainingData,
          ...new Uint8Array(paddingLength).fill(paddingLength),
        ]);
        processedData = await this.process(paddedData);
      } else {
        processedData = await this.process(remainingData);
        const paddingLength = processedData[processedData.length - 1];
        processedData = processedData.slice(0, -paddingLength);
      }

      buffer = new Uint8Array(0);
      session = undefined;

      return processedData;
    },
  });
}
