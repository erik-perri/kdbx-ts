export default function validateKdfArgon2Memory(memoryBytes: bigint): bigint {
  const ARGON2_MEMORY_MIN = BigInt(8);
  const ARGON2_MEMORY_MAX = BigInt(1) << BigInt(32); // 4,294,967,296

  if (memoryBytes < ARGON2_MEMORY_MIN || memoryBytes >= ARGON2_MEMORY_MAX) {
    throw new Error(
      `Invalid memory size. Expected between ${ARGON2_MEMORY_MIN} and ${ARGON2_MEMORY_MAX}, got ${memoryBytes}`,
    );
  }

  return memoryBytes;
}
