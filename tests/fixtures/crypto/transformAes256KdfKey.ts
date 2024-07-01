import crypto from 'crypto';

import { type KdbxAesKdfParameters } from '../../../src/types/format';

export default function transformAes256KdfKey(
  key: Uint8Array,
  parameters: KdbxAesKdfParameters,
): Promise<Uint8Array> {
  const cipher = crypto
    .createCipheriv('aes-256-ecb', parameters.seed, Buffer.alloc(0))
    .setAutoPadding(false);

  let result = Uint8Array.from(key);
  let iterations = parameters.rounds;

  while (iterations--) {
    result = cipher.update(result);
  }

  return Promise.resolve(
    Uint8Array.from(Buffer.concat([result, cipher.final()])),
  );
}
