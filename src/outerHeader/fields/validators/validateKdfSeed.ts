export default function validateKdfSeed(seed: Uint8Array): Uint8Array {
  const KDF_MIN_SEED_SIZE = 8;
  const KDF_MAX_SEED_SIZE = 32;

  if (
    seed.byteLength < KDF_MIN_SEED_SIZE ||
    seed.byteLength > KDF_MAX_SEED_SIZE
  ) {
    throw new Error(
      `Invalid seed size. Expected between ${KDF_MIN_SEED_SIZE} and ${KDF_MAX_SEED_SIZE} bytes, got ${seed.byteLength}`,
    );
  }

  return seed;
}
