export default class XmlWriter {
  private buffer: string = '';
  private currentOpenElements: string[] = [];
  private currentElementStartedAt: number = -1;

  constructor(
    private readonly indentString: string = '  ',
    private readonly lineSeparator: string = '\n',
  ) {
    //
  }

  get contents(): string {
    return this.buffer;
  }

  writeAttribute(name: string, value: string): void {
    if (this.currentElementStartedAt === -1) {
      throw new Error('Cannot write attribute after element has been closed');
    }

    const validNameRegex = /^[a-zA-Z_:][-a-zA-Z0-9_:.]*$/;

    if (!validNameRegex.test(name)) {
      throw new Error(`Invalid attribute name "${name}"`);
    }

    const escapedValue = value
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    this.buffer += ` ${name}="${escapedValue}"`;
  }

  writeCharacters(text: string): void {
    this.finishStartElement();

    this.buffer += this.escape(text);
  }

  writeEmptyElement(name: string): void {
    this.finishStartElement();

    this.buffer += `${this.startLine()}<${name}/>`;
  }

  writeEndDocument(): void {
    while (this.currentOpenElements.length > 0) {
      this.writeEndElement();
    }
  }

  writeEndElement(): void {
    if (this.currentElementStartedAt === this.buffer.length) {
      this.finishEmptyElement();

      return;
    }

    this.finishStartElement();

    const name = this.currentOpenElements.pop();

    if (name === undefined) {
      throw new Error('No element started to close');
    }

    this.buffer += `${this.startLine()}</${name}>`;
  }

  writeStartDocument(version: string, standalone: boolean): void {
    if (this.buffer.length > 0) {
      throw new Error('Document already started');
    }

    this.buffer += `<?xml version="${version}" encoding="UTF-8" standalone="${standalone ? 'yes' : 'no'}"?>`;
  }

  writeStartElement(name: string): void {
    this.finishStartElement();

    this.buffer += `${this.startLine()}<${name}`;
    this.currentElementStartedAt = this.buffer.length;
    this.currentOpenElements.push(name);
  }

  writeTextElement(qualifiedName: string, text: string): void {
    this.finishStartElement();

    this.buffer += `${this.startLine()}<${qualifiedName}>${this.escape(text)}</${qualifiedName}>`;
  }

  private finishEmptyElement(): void {
    if (this.currentElementStartedAt === -1) {
      throw new Error('No element started to finish');
    }

    this.buffer += '/>';
    this.currentOpenElements.pop();
    this.currentElementStartedAt = -1;
  }

  private finishStartElement(): boolean {
    if (this.currentElementStartedAt === -1) {
      return false;
    }

    this.buffer += '>';
    this.currentElementStartedAt = -1;

    return true;
  }

  private startLine(): string {
    return (
      this.lineSeparator +
      this.indentString.repeat(this.currentOpenElements.length)
    );
  }

  private escape(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
