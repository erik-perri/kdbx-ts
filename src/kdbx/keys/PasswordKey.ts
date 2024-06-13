import KdbxKey from './KdbxKey';

class PasswordKey extends KdbxKey {
  private key: Uint8Array | undefined;

  constructor() {
    super('77e90411-303a-43f2-b773-853b05635ead');
  }

  async getKey(): Promise<Uint8Array> {
    return Promise.resolve(this.key ?? new Uint8Array(0));
  }

  async setKey(data: Uint8Array): Promise<void> {
    if (data.byteLength !== 32) {
      throw new Error(
        `Invalid SHA256 password key. 32 bytes expected, ${data.byteLength} found.`,
      );
    }

    this.key = Uint8Array.from(data);

    return Promise.resolve();
  }
}

export default PasswordKey;
