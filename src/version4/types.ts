import type { KdbxHeader, KdbxSignature } from '../header/types';
import type KdbxDatabase from '../structure/Database';
import type { KdbxInnerHeaderFields } from './readInnerHeaderFields';

export type KdbxDatabase4 = {
  database: KdbxDatabase;
  header: KdbxHeader;
  innerHeaders: KdbxInnerHeaderFields;
  signature: KdbxSignature;
};

export type BinaryPool = Record<string, Uint8Array | undefined>;
