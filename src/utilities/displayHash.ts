export default function displayHash(hash: Uint8Array): string {
  if (hash.length === 0) {
    throw new Error('Unexpected hash length. Expected at least 1 byte');
  }

  return Array.from(hash)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
