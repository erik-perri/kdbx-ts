import crypto from 'crypto';

import createAes256CbcCipher from './crypto/createAes256CbcCipher';
import transformAes256KdfKey from './crypto/transformAes256KdfKey';
import type SymmetricCipherDirection from './enums/SymmetricCipherDirection';
import {
  type KdbxAesKdfParameters,
  type KdbxArgon2KdfParameters,
} from './types/format';

export type Dependencies = {
  cipherAes256: SymmetricCipherFactory;
  cipherChaCha20?: SymmetricCipherFactory;
  cipherSalsa20?: SymmetricCipherFactory;
  cipherTwofish?: SymmetricCipherFactory;

  hash: HashFactory;
  hmac: HmacFactory;

  randomBytes: (length: number) => Promise<Uint8Array>;

  transformKdfAes256: TransformAesKdfKey;
  transformKdfArgon2?: TransformArgon2KdfKey;
};

export type SymmetricCipher = {
  finish(data: Uint8Array): Promise<Uint8Array>;
  process(data: Uint8Array): Promise<Uint8Array>;
};

export type HashFactory = (
  algorithm: string,
) => Promise<ReturnType<typeof crypto.createHash>>;

export type HmacFactory = (
  algorithm: string,
  key: Uint8Array,
) => Promise<ReturnType<typeof crypto.createHmac>>;

export type SymmetricCipherFactory = (
  direction: SymmetricCipherDirection,
  key: Uint8Array,
  iv: Uint8Array,
) => Promise<SymmetricCipher>;

export type TransformAesKdfKey = (
  key: Uint8Array,
  parameters: KdbxAesKdfParameters,
) => Promise<Uint8Array>;

export type TransformArgon2KdfKey = (
  key: Uint8Array,
  parameters: KdbxArgon2KdfParameters,
) => Promise<Uint8Array>;

const dependencies: Dependencies = {
  cipherAes256: createAes256CbcCipher,
  cipherChaCha20: undefined,
  cipherSalsa20: undefined,
  cipherTwofish: undefined,

  hash: (algorithm) => Promise.resolve(crypto.createHash(algorithm)),
  hmac: (algorithm, key) => Promise.resolve(crypto.createHmac(algorithm, key)),

  randomBytes: (length: number) => Promise.resolve(crypto.randomBytes(length)),

  transformKdfAes256: transformAes256KdfKey,
  transformKdfArgon2: undefined,
};

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
    case 'transformKdfAes256':
      return 'AES-256 KDF transformer';
    case 'transformKdfArgon2':
      return 'Argon2 KDF transformer';
  }
}
