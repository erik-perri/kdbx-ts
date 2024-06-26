import { KeePass1, KeePass2 } from '../constants';
import KeePassVersion from '../enums/KeePassVersion';
import { type KdbxSignature } from '../types/format';

const signatures = Object.freeze([
  {
    signature1: KeePass1.signature1,
    signature2: KeePass1.signature2,
    version: KeePassVersion.KeePass1,
  },
  {
    signature1: KeePass2.signature1,
    signature2: KeePass2.signature2,
    version: KeePassVersion.KeePass2,
  },
] as const);

export default function getVersionFromSignature(
  signature: KdbxSignature,
): KeePassVersion {
  const found = signatures.find(
    ({ signature1, signature2 }) =>
      signature1 === signature.signature1 &&
      signature2 === signature.signature2,
  );

  return found?.version ?? KeePassVersion.Unknown;
}
