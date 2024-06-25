import type Argon2Type from '../enums/Argon2Type';
import type Argon2Version from '../enums/Argon2Version';
import type HashAlgorithm from '../enums/HashAlgorithm';
import type SymmetricCipherAlgorithm from '../enums/SymmetricCipherAlgorithm';
import type SymmetricCipherDirection from '../enums/SymmetricCipherDirection';

export type CryptoCipher = {
  process(data: Uint8Array): Promise<Uint8Array>;

  /*
   * Finish cipher processing, destroying the cipher and returning the final data.
   */
  finish(data: Uint8Array): Promise<Uint8Array>;
};

export type CryptoImplementation = {
  createCipher(
    algorithm: SymmetricCipherAlgorithm,
    direction: SymmetricCipherDirection,
    key: Uint8Array,
    iv: Uint8Array,
  ): Promise<CryptoCipher>;

  hash(algorithm: HashAlgorithm, data: Uint8Array[]): Promise<Uint8Array>;

  hmac(
    algorithm: HashAlgorithm,
    key: Uint8Array,
    data: Uint8Array[],
  ): Promise<Uint8Array>;

  randomBytes(length: number): Promise<Uint8Array>;

  transformAesKdfKey(
    key: Uint8Array,
    seed: Uint8Array,
    iterations: bigint,
  ): Promise<Uint8Array>;

  transformArgon2KdfKey(
    key: Uint8Array,
    salt: Uint8Array,
    version: Argon2Version,
    type: Argon2Type,
    memoryInKibibytes: bigint,
    parallelism: bigint,
    iterations: bigint,
  ): Promise<Uint8Array>;
};
