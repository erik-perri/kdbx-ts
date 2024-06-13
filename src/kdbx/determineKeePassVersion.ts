import KeePassVersion from './enums/KeePassVersion';

const signatures = [
  {
    signatureOne: 0x9aa2d903,
    signatureTwo: 0xb54bfb65,
    version: KeePassVersion.KeePass1,
  },
  {
    signatureOne: 0x9aa2d903,
    signatureTwo: 0xb54bfb67,
    version: KeePassVersion.KeePass2,
  },
];

export default function determineKeePassVersion(
  signatureOne: number,
  signatureTwo: number,
): KeePassVersion {
  const version = signatures.find(
    (signature) =>
      signature.signatureOne === signatureOne &&
      signature.signatureTwo === signatureTwo,
  );

  return version?.version ?? KeePassVersion.Unknown;
}
