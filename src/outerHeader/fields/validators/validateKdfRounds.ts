export default function validateKdfRounds(rounds: bigint): bigint {
  if (rounds < BigInt(1) || rounds > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error(
      `Invalid number of rounds. Expected between 1 and ${Number.MAX_SAFE_INTEGER}, got ${rounds}`,
    );
  }

  return rounds;
}
