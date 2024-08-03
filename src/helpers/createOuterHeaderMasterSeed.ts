import { getDependency } from '../dependencies';

export default async function createOuterHeaderMasterSeed(): Promise<Uint8Array> {
  const randomBytes = getDependency('randomBytes');

  return await randomBytes(32);
}
