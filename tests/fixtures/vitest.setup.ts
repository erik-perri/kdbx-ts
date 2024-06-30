import createChaCha20Cipher from '../../src/crypto/createChaCha20Cipher';
import createTwofishCbcCipher from '../../src/crypto/createTwofishCbcCipher';
import { configureDependencies } from '../../src/dependencies';
import transformAes256KdfKey from './crypto/transformAes256KdfKey';
import transformArgon2KdfKey from './crypto/transformArgon2KdfKey';

configureDependencies({
  cipherChaCha20: createChaCha20Cipher,
  cipherTwofish: createTwofishCbcCipher,
  transformAes256KdfKey: transformAes256KdfKey,
  transformArgon2KdfKey: transformArgon2KdfKey,
});
