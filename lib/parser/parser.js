'use strict';

var _ = require('lodash');
var ParseError = require('./error/parse');

module.exports = Parser;


function Parser(input) {
    this.input = input;
    this.position = 0;
    this.tokenRegexp = /\w|-/;
}

Parser.prototype.getNextChar = function () {
    return this.input[this.position];
};

Parser.prototype.consumeNextChar = function () {
    return this.input[this.position++];
};

Parser.prototype.consumeWhile = function (test) {
    var result = '';

    while (!this.isAtEof() && test(this.input[this.position])) {
        result += this.consumeNextChar();
    }

    return result;
};

Parser.prototype.consumeWhitespaces = function () {
    return this.consumeWhile(RegExp.prototype.test.bind(/\s/));
};

Parser.prototype.consumeChars = function (howMany) {
    var amountConsumed = 0;
    return this.consumeWhile(function () { return amountConsumed++ < howMany; });
};

Parser.prototype.consumeToken = function () {
    return this.consumeWhile(RegExp.prototype.test.bind(this.tokenRegexp));
};

Parser.prototype.ensureNextCharIs = function (expectedChar) {
    var nextChar = this.consumeNextChar();
    if (nextChar !== expectedChar) {
        throw ParseError.unexpected(nextChar, expectedChar);
    }
};

Parser.prototype.startsWith = function (string) {
    var input = this.input;
    var position = this.position;
    var charCount = 0;
    var stringLength = string.length;
    var result = true;

    while (
        result === true &&
        !_(input[position]).isUndefined() &&
        charCount < stringLength
    ) {
        result = input[position] === string[charCount];
        ++charCount;
        ++position;
    }

    return result;
};

Parser.prototype.isAtEof = function () {
    return this.position >= this.input.length;
};
