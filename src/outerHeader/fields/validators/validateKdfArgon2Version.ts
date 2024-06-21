import Argon2Version from '../../../enums/Argon2Version';
import joinWithConjunction from '../../../utilities/joinWithConjunction';

export default function validateKdfArgon2Version(
  version: number,
): Argon2Version {
  const supportedVersions: number[] = Object.values(Argon2Version);

  if (!supportedVersions.includes(version)) {
    const displayValues = joinWithConjunction(
      supportedVersions.map((v) => `"0x${v.toString(16)}"`),
      'or',
    );

    throw new Error(
      `Invalid Argon2 version. Expected one of ${displayValues}, got "0x${version.toString(16)}"`,
    );
  }

  return version as Argon2Version;
}
