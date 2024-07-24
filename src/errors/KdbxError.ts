export default class KdbxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KdbxError';
  }
}
