import crypto from 'crypto';

import { type KdbxAesKdfParameters } from '../../../src/types/format';

export default function transformAes256KdfKey(
  key: Uint8Array,
  parameters: KdbxAesKdfParameters,
): Promise<Uint8Array> {
  let result = Uint8Array.from(key);
  let iterations = parameters.rounds;

  while (iterations--) {
    const cipher = crypto
      .createCipheriv('aes-256-ecb', parameters.seed, Buffer.alloc(0))
      .setAutoPadding(false);
    result = Buffer.concat([cipher.update(result), cipher.final()]);
  }

  return Promise.resolve(result);
}
