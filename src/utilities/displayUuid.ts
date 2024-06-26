export default function displayUuid(uuid: Uint8Array): string {
  if (uuid.length !== 16) {
    throw new Error(
      `Invalid UUID length. Expected 16 bytes, got ${uuid.length}`,
    );
  }

  return Buffer.from(uuid)
    .toString('hex')
    .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5')
    .toLowerCase();
}
