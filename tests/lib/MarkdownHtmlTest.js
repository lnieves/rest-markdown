'use strict';

const fs = require('fs');
const MarkdownHtml = require('../../lib/MarkdownHtml');
const chai = require('chai');
chai.should();

describe('MarkdownHtml', () => {
    var parser;

    beforeEach(() => {
        parser = new MarkdownHtml();
    });

    it ('Should split into blocks', () => {
        const source = fs.readFileSync(__dirname + '/fixtures/ruby-README.md', { encoding: 'utf-8'});
        parser.splitBlocks(source).should.have.length(25);
    });

    it ('Should split into lines', () => {
        const source = fs.readFileSync(__dirname + '/fixtures/paragraph.md', {encoding: 'utf-8'});
        parser.splitLines(source).should.have.length(6);
    });

    it ('Should wrap with headings', () => {
        const fixtures = [
            ['# Welcome to Rails', '<h1>Welcome to Rails</h1>'],
            ['## Welcome to Rails','<h2>Welcome to Rails</h2>'],
            ['### Welcome to Rails','<h3>Welcome to Rails</h3>'],
            ['#### Welcome to Rails','<h4>Welcome to Rails</h4>'],
            ['##### Welcome to Rails','<h5>Welcome to Rails</h5>'],
            ['###### Welcome to Rails','<h6>Welcome to Rails</h6>'],
            [' # Welcome to Rails',' # Welcome to Rails'],
            ['## ### Welcome to Rails','<h2>### Welcome to Rails</h2>']
        ];
        fixtures.forEach( (fixture) => {
            parser.headingsWrap(fixture[0]).should.equal(fixture[1]);
        });
    });

    it ('Converts paragraphs', () => {
        const fixtures = [
            ['A simple line', '<p>A simple line</p>'],
            ['A multiline\nParagraph\nwith several newlines', '<p>A multiline\nParagraph\nwith several newlines</p>'],
            ['# A simple line', '# A simple line']
        ];

        fixtures.forEach((fixture) => {
            parser.paragraphWrap(fixture[0]).should.equal(fixture[1]);
        });
    });

    it('Wraps inline', () => {
        const fixtures = [
            ['_Model layer_', '<em>Model layer</em>'],
            ['*Model layer*', '<em>Model layer</em>'],
            ['**Model layer**', '<strong>Model layer</strong>']
        ];
        fixtures.forEach((fixture) => {
            parser.inlineWrap(fixture[0]).should.equal(fixture[1]);
        });
    });
     it('Generates Links', () => {
         const fixtures = [
             ['[Model-View-Controller (MVC)](http://en.wikipedia.org/wiki/Model-view-controller)',
                '<a href="http://en.wikipedia.org/wiki/Model-view-controller">Model-View-Controller (MVC)</a>'],
            [ '[README](activerecord/README.rdoc)', '<a href="activerecord/README.rdoc">README</a>']
         ];
         fixtures.forEach((fixture) => {
             parser.parseLinks(fixture[0]).should.equal(fixture[1]);
         });

     });
});