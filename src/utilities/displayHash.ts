export default function displayHash(hash: Uint8Array): string {
  return Array.from(hash)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
