export default class XmlWriter {
  private buffer: string = '';
  private currentOpenElements: string[] = [];
  private currentElementStartTagClosed: boolean = true;

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
    if (this.currentElementStartTagClosed) {
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
    this.currentElementStartTagClosed = false;
    this.currentOpenElements.push(name);
  }

  writeTextElement(qualifiedName: string, text: string): void {
    this.finishStartElement();

    this.buffer += `${this.startLine()}<${qualifiedName}>${this.escape(text)}</${qualifiedName}>`;
  }

  private finishStartElement(): boolean {
    if (this.currentElementStartTagClosed) {
      return false;
    }

    this.buffer += `>`;
    this.currentElementStartTagClosed = true;

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
