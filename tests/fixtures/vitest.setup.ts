import createChaCha20Cipher from '../../src/crypto/createChaCha20Cipher';
import createTwofishCbcCipher from '../../src/crypto/createTwofishCbcCipher';
import { configureDependencies } from '../../src/dependencies';
import transformAes256KdfKey from './crypto/transformAes256KdfKey';
import transformKdfArgon2 from './crypto/transformKdfArgon2';

configureDependencies({
  cipherChaCha20: createChaCha20Cipher,
  cipherTwofish: createTwofishCbcCipher,
  transformKdfAes256: transformAes256KdfKey,
  transformKdfArgon2: transformKdfArgon2,
});
