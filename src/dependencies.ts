import crypto from 'crypto';

import createAes256CbcCipher from './crypto/createAes256CbcCipher';
import createChaCha20Cipher from './crypto/createChaCha20Cipher';
import createTwofishCbcCipher from './crypto/createTwofishCbcCipher';
import type SymmetricCipherDirection from './enums/SymmetricCipherDirection';
import {
  type KdbxAesKdfParameters,
  type KdbxArgon2KdfParameters,
} from './types/format';

const dependencies: Dependencies = {
  cipherAes256: createAes256CbcCipher,
  cipherChaCha20: createChaCha20Cipher,
  cipherSalsa20: undefined,
  cipherTwofish: createTwofishCbcCipher,

  hash: (algorithm) => Promise.resolve(crypto.createHash(algorithm)),
  hmac: (algorithm, key) => Promise.resolve(crypto.createHmac(algorithm, key)),

  randomBytes: (length: number) => Promise.resolve(crypto.randomBytes(length)),

  transformAes256KdfKey: undefined,
  transformArgon2KdfKey: undefined,
};

export type Dependencies = {
  cipherAes256?: SymmetricCipherFactory;
  cipherChaCha20?: SymmetricCipherFactory;
  cipherSalsa20?: SymmetricCipherFactory;
  cipherTwofish?: SymmetricCipherFactory;

  hash?: HashFactory;
  hmac?: HmacFactory;

  randomBytes?: (length: number) => Promise<Uint8Array>;

  transformAes256KdfKey?: TransformAes256KdfKey;
  transformArgon2KdfKey?: TransformArgon2KdfKey;
};

export type SymmetricCipher = {
  finish(data: Uint8Array): Promise<Uint8Array>;
  process(data: Uint8Array): Promise<Uint8Array>;
};

export type HashImplementation = {
  update(data: Uint8Array): HashImplementation;
  digest(): Uint8Array;
};

export type HashFactory = (algorithm: string) => Promise<HashImplementation>;

export type HmacImplementation = {
  update(data: Uint8Array): HmacImplementation;
  digest(): Uint8Array;
};

export type HmacFactory = (
  algorithm: string,
  key: Uint8Array,
) => Promise<HmacImplementation>;

export type SymmetricCipherFactory = (
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  iv: Uint8Array,
) => Promise<SymmetricCipher>;

export type TransformAes256KdfKey = (
  key: Uint8Array,
  parameters: KdbxAesKdfParameters,
) => Promise<Uint8Array>;

export type TransformArgon2KdfKey = (
  key: Uint8Array,
  parameters: KdbxArgon2KdfParameters,
) => Promise<Uint8Array>;

export function configureDependencies(overrides: Partial<Dependencies>): void {
  Object.assign(dependencies, overrides);
}

export function getDependency<T extends keyof Dependencies>(
  dependency: T,
): NonNullable<Dependencies[T]> {
  if (dependencies[dependency] === undefined) {
    throw new Error(
      `No ${displayDependencyDescription(dependency)} handler defined to use. Configure the "${dependency}" dependency to continue.`,
    );
  }

  return dependencies[dependency] as NonNullable<Dependencies[T]>;
}

function displayDependencyDescription(key: keyof Dependencies): string {
  switch (key) {
    case 'cipherAes256':
      return 'AES-256 cipher';
    case 'cipherChaCha20':
      return 'ChaCha20 cipher';
    case 'cipherSalsa20':
      return 'Salsa20 cipher';
    case 'cipherTwofish':
      return 'Twofish cipher';
    case 'hash':
      return 'Hash function';
    case 'hmac':
      return 'HMAC function';
    case 'randomBytes':
      return 'Random bytes generator';
    case 'transformAes256KdfKey':
      return 'AES-256 KDF transformer';
    case 'transformArgon2KdfKey':
      return 'Argon2 KDF transformer';
  }
}
