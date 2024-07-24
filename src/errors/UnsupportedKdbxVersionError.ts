import KdbxError from './KdbxError';

export default class UnsupportedKdbxVersionError extends KdbxError {
  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedKdbxVersionError';
  }
}
