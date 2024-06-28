import * as argon2 from 'argon2';

import { configureDependencies } from '../src/dependencies';
import createChaCha20Cipher from './crypto/createChaCha20Cipher';
import createTwofishCbcCipher from './crypto/createTwofishCbcCipher';

configureDependencies({
  cipherChaCha20: createChaCha20Cipher,
  cipherTwofish: createTwofishCbcCipher,
  transformKdfArgon2: async (key, parameters) => {
    return Uint8Array.from(
      await argon2.hash(Buffer.from(key), {
        memoryCost: Number(parameters.memoryInBytes / BigInt(1024)),
        parallelism: Number(parameters.parallelism),
        salt: parameters.seed,
        timeCost: Number(parameters.iterations),
        type: parameters.type,
        version: parameters.version,
        raw: true,
      }),
    );
  },
});
