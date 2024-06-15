export default function displayUuid(uuid: Uint8Array): string {
  if (uuid.length !== 16) {
    throw new Error(
      `Invalid UUID length. Expected 16 bytes, got ${uuid.length}`,
    );
  }

  const uuidAsHex: string = [...uuid]
    .map((input: number) => input.toString(16).padStart(2, '0'))
    .join('');

  return (
    uuidAsHex.slice(0, 8) +
    '-' +
    uuidAsHex.slice(8, 12) +
    '-' +
    uuidAsHex.slice(12, 16) +
    '-' +
    uuidAsHex.slice(16, 20) +
    '-' +
    uuidAsHex.slice(20)
  ).toLowerCase();
}
