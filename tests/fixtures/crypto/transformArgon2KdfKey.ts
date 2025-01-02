import * as argon2 from 'argon2';

import { type KdbxArgon2KdfParameters } from '../../../src/types/format';

export default async function transformArgon2KdfKey(
  key: Uint8Array,
  parameters: KdbxArgon2KdfParameters,
): Promise<Uint8Array> {
  return Uint8Array.from(
    await argon2.hash(Buffer.from(key), {
      memoryCost: Number(parameters.memoryInBytes / BigInt(1024)),
      parallelism: Number(parameters.parallelism),
      salt: Buffer.from(parameters.seed),
      timeCost: Number(parameters.iterations),
      type: parameters.type,
      version: parameters.version,
      raw: true,
    }),
  );
}
