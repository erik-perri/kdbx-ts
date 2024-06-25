import KeePassVersion from '../enums/KeePassVersion';
import { type KdbxSignature } from '../types/format';
import { KeePass1, KeePass2 } from '../versions';

export default function getVersionFromSignature(
  signature: KdbxSignature,
): KeePassVersion {
  const details = [KeePass1, KeePass2].find(
    (version) =>
      version.signature1 === signature.signature1 &&
      version.signature2 === signature.signature2,
  );

  return details?.version ?? KeePassVersion.Unknown;
}
