import KdbxError from './KdbxError';

export default class UnknownKdbxSignatureError extends KdbxError {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownKdbxSignatureError';
  }
}
