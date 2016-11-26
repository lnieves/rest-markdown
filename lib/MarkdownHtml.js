'use strict';

const MARKER_HEADING = /^#+/;
const REGEXP_EM =/(?<!\*)(_|\*)([^*]+)\1/;
const REGEXP_STRONG = /(\*{2})(.*?)\1/;

class MarkdownHtml {
    /**
     * @param {string} source
     * @returns {string}
     */
    process(source) {
        return this.htmlWrap(
            this.h1Wrap(source)
        );
    }

    /**
     * @param {string} source
     * @returns {string}
     */
    splitBlocks(source) {
        return source.split(/\n{2,}/);
    }

    /**
     * @param {string} source
     * @returns {string}
     */
    splitLines(source) {
        return source.split(/\n/);
    }

    /**
     * @param {string} source
     * @returns {string}
     */
    htmlWrap(source) {
        return '<html><body>' + source + '</body></html>';
    }

    /**
     * @param {string} source
     * @returns {string}
     */
    headingsWrap(source) {
        let match = source.match(MARKER_HEADING);
        if (!match) return source;

        let count = match[0].length;
        return source.replace(/(^|\n)#+\s+(.*)$/, `<h${count}>$2</h${count}>`);
    }

    /**
     * @param {string} source
     * @returns {string}
     */
    paragraphWrap(source) {
        if (source.match(MARKER_HEADING)) return source;

        return '<p>' + source + '</p>';
    }

    /**
     * @param {string} source
     * @returns {string}
     */
    inlineWrap(source) {
        return source.replace(REGEXP_EM, '<em>$2</em>')
            .replace(REGEXP_STRONG, '<strong>$2</strong>');
    }
}

module.exports = MarkdownHtml;