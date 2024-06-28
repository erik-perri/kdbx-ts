import { configureDependencies } from '../src/dependencies';
import createChaCha20Cipher from './crypto/createChaCha20Cipher';
import createTwofishCbcCipher from './crypto/createTwofishCbcCipher';
import transformKdfArgon2 from './crypto/transformKdfArgon2';

configureDependencies({
  cipherChaCha20: createChaCha20Cipher,
  cipherTwofish: createTwofishCbcCipher,
  transformKdfArgon2: transformKdfArgon2,
});
