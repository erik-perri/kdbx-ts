export default class UnsupportedKdbxVersionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedKdbxVersionError';
  }
}
