export default function validateKdfArgon2Parallelism(threads: bigint): bigint {
  const ARGON2_THREADS_MIN = BigInt(1);
  const ARGON2_THREADS_MAX = BigInt(1 << 24); // 16,777,216

  if (threads < ARGON2_THREADS_MIN || threads >= ARGON2_THREADS_MAX) {
    throw new Error(
      `Invalid number of threads. Expected between ${ARGON2_THREADS_MIN} and ${ARGON2_THREADS_MAX}, got ${threads}`,
    );
  }

  return threads;
}
