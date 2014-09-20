'use strict';

var inherits = require('util').inherits;
var Parser = require('./parser');
var ParseError = require('./error/parse');
var SimpleSelector = require('../css/simple-selector');

module.exports = CssParser;


function CssParser(input) {
    CssParser.super_.call(this, input);
}
inherits(CssParser, Parser);

CssParser.prototype.parseSimpleSelector = function () {
    var selector = new SimpleSelector();
    var nextChar;

    while (!this.isAtEof()) {
        nextChar = this.getNextChar();
        if (nextChar === '#') {
            this.consumeNextChar();
            selector.id = this.consumeToken();
        } else if (nextChar === '.') {
            this.consumeNextChar();
            selector.classNames.push(this.consumeToken());
        } else if (nextChar === '*') {
            this.consumeNextChar();
        } else if (this.tokenRegexp.test(nextChar)) {
            selector.tagName = this.consumeToken();
        } else {
            break;
        }
    }

    return selector;
};

CssParser.prototype.parseRule = function () {
    return new Rule(this.parseSelectors(), this.parseDeclarations());
};

CssParser.prototype.parseSelectors = function () {
    var selectors = [];

    while (this.getNextChar() !== '{') {
        selectors.push(this.parseSimpleSelector());
        this.consumeWhitespaces();
        if (this.getNextChar() === ',') {
            this.consumeNextChar();
            this.consumeWhitespaces();
        } else {
            throw new ParseError.unexpectedIn(this.getNextChar(), 'selector list');
        }
    }

    return selectors.sort(function (s1, s2) {
        return SimpleSelector.getMostSpecific(s1, s2);
    });
};
