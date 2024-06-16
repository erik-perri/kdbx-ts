import type SymmetricCipherMode from '../enums/SymmetricCipherMode';
import type VariantMapFieldType from '../enums/VariantMapFieldType';
import type { KdbxHeader, KdbxSignature } from '../header/types';
import type KdbxDatabase from '../structure/Database';

export type KdbxDatabase4 = {
  database: KdbxDatabase;
  header: KdbxHeader;
  innerHeaders: KdbxInnerHeaderFields;
  signature: KdbxSignature;
};

export type KdbxInnerHeaderFields = {
  innerStreamMode: SymmetricCipherMode;
  innerStreamKey: Uint8Array;
  binaryPool: BinaryPool;
};

export type BinaryPool = Record<string, Uint8Array | undefined>;

export type VariantMapData =
  | {
      type: typeof VariantMapFieldType.End;
      value: never;
    }
  | {
      type: typeof VariantMapFieldType.Bool;
      value: boolean;
    }
  | {
      type: typeof VariantMapFieldType.Int32;
      value: number;
    }
  | {
      type: typeof VariantMapFieldType.UInt32;
      value: number;
    }
  | {
      type: typeof VariantMapFieldType.Int64;
      value: bigint;
    }
  | {
      type: typeof VariantMapFieldType.UInt64;
      value: bigint;
    }
  | {
      type: typeof VariantMapFieldType.String;
      value: string;
    }
  | {
      type: typeof VariantMapFieldType.ByteArray;
      value: Uint8Array;
    };

export type VariantMap = {
  [key: string]: VariantMapData | undefined;
};
