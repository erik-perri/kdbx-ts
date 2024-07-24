export default class UnknownKdbxSignatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownKdbxSignatureError';
  }
}
