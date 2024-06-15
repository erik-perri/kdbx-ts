import { describe, expect, it } from 'vitest';

import XmlReader from './XmlReader';

describe('XmlReader', () => {
  describe('constructor', () => {
    it('reads the xml header', () => {
      // Arrange
      const header = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

      // Act
      const reader = new XmlReader(header + '\n' + '<KeePassFile />');

      // Assert
      expect(reader.current).toEqual({
        name: 'xml',
        isClose: false,
        isOpen: false,
        isMeta: true,
        attributes: {
          version: '1.0',
          encoding: 'UTF-8',
          standalone: 'yes',
        },
        position: [0, header.length],
      });
    });

    it('reads the first element', () => {
      // Arrange
      // Nothing to arrange.

      // Act
      const reader = new XmlReader('<Root/>');

      // Assert
      expect(reader.current).toEqual({
        name: 'Root',
        isClose: true,
        isOpen: true,
        isMeta: false,
        attributes: {},
        position: [0, 7],
      });
    });
  });

  describe('readNextStartElement', () => {
    it('reads elements in order', () => {
      // Arrange
      const xml =
        '<?xml version="1.0"?>\n' +
        '<KeePassFile>\n' +
        ' <Meta>\n' +
        '  <Generator>KeePassXC</Generator>\n' +
        '  <DatabaseName>Sample</DatabaseName>' +
        ' </Meta>\n' +
        '</KeePassFile>';

      const reader = new XmlReader(xml);

      // Act
      reader.readNextStartElement();

      // Assert
      expect(reader.current).toEqual({
        name: 'KeePassFile',
        isOpen: true,
        isClose: false,
        isMeta: false,
        attributes: {},
        position: [22, 35],
      });

      reader.readNextStartElement();

      expect(reader.current).toEqual({
        name: 'Meta',
        isOpen: true,
        isClose: false,
        isMeta: false,
        attributes: {},
        position: [37, 43],
      });
    });

    it('skips `close` elements', () => {
      // Arrange
      const reader = new XmlReader(
        '<?xml version="1.0"?>\n' +
          '<KeePassFile>\n' +
          ' <Meta>\n' +
          '  <Generator>KeePassXC</Generator>\n' +
          '  <DatabaseName>Sample</DatabaseName>' +
          ' </Meta>\n' +
          '</KeePassFile>',
      );

      // Act
      reader.readNextStartElement();
      reader.readNextStartElement();
      reader.readNextStartElement();

      // Assert
      expect(reader.current).toEqual({
        name: 'Generator',
        isOpen: true,
        isClose: false,
        isMeta: false,
        attributes: {},
        position: [46, 57],
      });

      reader.readNextStartElement();

      expect(reader.current).toEqual({
        name: 'DatabaseName',
        isOpen: true,
        isClose: false,
        isMeta: false,
        attributes: {},
        position: [81, 95],
      });
    });

    it('reads attributes', () => {
      // Arrange
      const reader = new XmlReader(
        '<?xml version="1.0"?>\n' +
          '<Tag value="a" value-with-space="a space" booleanValue name_with_underscore="" />',
      );

      // Act
      reader.readNextStartElement();

      // Assert
      expect(reader.current).toEqual(
        expect.objectContaining({
          name: 'Tag',
          isOpen: true,
          isClose: true,
          attributes: {
            value: 'a',
            'value-with-space': 'a space',
            booleanValue: 'true',
            name_with_underscore: '',
          },
        }),
      );
    });
  });

  describe('readElementText', () => {
    it('reads element text', () => {
      // Arrange
      const reader = new XmlReader(
        '<?xml version="1.0"?>\n' +
          '<Generator>KeePassXC</Generator>\n' +
          '<DatabaseName>Sample</DatabaseName>\n' +
          '<Test>Sample text <span>with child element</span></Test>',
      );

      // Act
      reader.readNextStartElement();

      // Assert
      expect(reader.readElementText()).toEqual('KeePassXC');

      reader.readNextStartElement();

      expect(reader.readElementText()).toEqual('Sample');

      reader.readNextStartElement();

      expect(reader.readElementText()).toEqual(
        'Sample text <span>with child element</span>',
      );
    });

    it('returns empty if element is closed', () => {
      // Arrange
      const reader = new XmlReader('<?xml version="1.0"?><ElementOne />');

      // Act
      reader.readNextStartElement();

      const result = reader.readElementText();

      // Assert
      expect(result).toEqual('');
    });

    it('throws an error if element is not properly closed', () => {
      // Arrange
      const reader = new XmlReader(
        '<?xml version="1.0"?><ElementOne><ElementTwo />',
      );

      // Act
      reader.readNextStartElement();

      // Assert
      expect(() => reader.readElementText()).toThrow(
        /Unable to find end "ElementOne" element/,
      );
    });
  });

  describe('skipCurrentElement', () => {
    it('skips past close tags of parents', () => {
      // Arrange
      const reader = new XmlReader(
        '<?xml version="1.0"?>\n' +
          '<Meta>\n' +
          ' <Child>\n' +
          '  <Generator>KeePassXC</Generator>\n' +
          '  <DatabaseName>Sample</DatabaseName>' +
          ' </Child>\n' +
          '</Meta>\n' +
          '<Root />\n',
      );

      // Act
      reader.readNextStartElement();
      reader.readNextStartElement();

      // Assert
      expect(reader.current.name).toEqual('Child');

      reader.skipCurrentElement();
      reader.readNextStartElement();

      expect(reader.current.name).toEqual('Root');
    });

    it('skips past child of the same type', () => {
      // Arrange
      const reader = new XmlReader(
        '<?xml version="1.0"?>\n' +
          '<Meta>\n' +
          ' <Child>\n' +
          '  <Meta>\n' +
          '   <Generator>KeePassXC</Generator>\n' +
          '  </Meta>\n' +
          ' </Child>\n' +
          '</Meta>\n' +
          '<Root />\n',
      );

      // Act
      reader.readNextStartElement();

      // Assert
      expect(reader.current.name).toEqual('Meta');

      reader.skipCurrentElement();
      reader.readNextStartElement();

      expect(reader.current.name).toEqual('Root');
    });

    it('skips past not open elements', () => {
      // Arrange
      const reader = new XmlReader(
        '<?xml version="1.0"?><ElementOne /><ElementTwo />',
      );

      // Act
      reader.readNextStartElement();

      // Assert
      expect(reader.current.name).toEqual('ElementOne');

      reader.skipCurrentElement();

      expect(reader.current.name).toEqual('ElementTwo');
    });

    it('throws an error if element is not properly closed', () => {
      // Arrange
      const reader = new XmlReader(
        '<?xml version="1.0"?><ElementOne><ElementTwo />',
      );

      // Act
      reader.readNextStartElement();

      // Assert
      expect(reader.current.name).toEqual('ElementOne');

      expect(() => {
        reader.skipCurrentElement();
      }).toThrow(/Unable to find end "ElementOne" element/);
    });
  });
});
