abstract class KdbxKey {
  protected constructor(protected readonly uuid: string) {
    //
  }

  public abstract getKey(): Promise<Uint8Array>;

  public abstract setKey(data: Uint8Array): Promise<void>;
}

export default KdbxKey;
