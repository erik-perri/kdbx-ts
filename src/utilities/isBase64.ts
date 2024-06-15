export default function isBase64(input: string): boolean {
  return Boolean(
    input.match(/(^(?:[a-z\d+/]{4})*(?:[a-z\d+/]{3}=|[a-z\d+/]{2}==)?$)/i),
  );
}
