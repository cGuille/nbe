'use strict';

var inherits = require('util').inherits;
var Parser = require('./parser');
var ParseError = require('./error/parse');
var Rule = require('../css/rule');
var SimpleSelector = require('../css/simple-selector');
var Value = require('../css/value');
var StyleSheet = require('../css/stylesheet');

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

    for (; ; ) {
        selectors.push(this.parseSimpleSelector());
        this.consumeWhitespaces();
        if (this.getNextChar() === ',') {
            this.consumeNextChar();
            this.consumeWhitespaces();
        } else if (this.getNextChar() === '{') {
            break;
        } else {
            throw new ParseError.unexpectedIn(this.getNextChar(), 'selector list');
        }
    }

    return selectors.sort(function (s1, s2) {
        return SimpleSelector.getMostSpecific(s1, s2);
    });
};

CssParser.prototype.parseDeclarations = function () {
    var declarations = {};
    var declaration;

    this.ensureNextCharIs('{');
    this.consumeWhitespaces();
    while (this.getNextChar() !== '}') {
        declaration = this.parseDeclaration();
        declarations[declaration.property] = declaration.value;
        this.consumeWhitespaces();
    }
    this.consumeNextChar();
    this.consumeWhitespaces();

    return declarations;
};

CssParser.prototype.parseDeclaration = function () {
    var declaration = {};

    declaration['property'] = this.consumeToken();
    this.consumeWhitespaces();
    this.ensureNextCharIs(':');
    this.consumeWhitespaces();
    declaration['value'] = this.parseValue();
    this.consumeWhitespaces();
    this.ensureNextCharIs(';');

    return declaration;
};

CssParser.prototype.parseValue = (function (isNumeric) {
    return function () {
        var nextChar = this.getNextChar();

        if (isNumeric(nextChar)) {
            return this.parseLength();
        } else if (nextChar === '#') {
            return this.parseColor();
        } else {
            return new Value.Keyword(this.consumeToken());
        }
    };
}(RegExp.prototype.test.bind(/\d/)));

CssParser.prototype.parseLength = function () {
    return new Value.Length(this.parseSize(), this.parseUnit());
};

CssParser.prototype.parseSize = (function (isNumberPart) {
    return function () {
        return parseFloat(this.consumeWhile(isNumberPart));
    };
}(RegExp.prototype.test.bind(/[\d.]/)));

CssParser.prototype.parseUnit = function () {
    return this.consumeToken();
};

CssParser.prototype.parseColor = function () {
    this.ensureNextCharIs('#');
    return new Value.Color(
        this.parseHexPair(),
        this.parseHexPair(),
        this.parseHexPair(),
        255
    );
};

CssParser.prototype.parseHexPair = function () {
    return parseInt(this.consumeChars(2), 16);
};

CssParser.prototype.parse = function () {
    var rules = [];
    while (!this.isAtEof()) {
        rules.push(this.parseRule());
    }

    return new StyleSheet(rules);
};
