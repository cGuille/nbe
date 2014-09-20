'use strict';

var inherits = require('util').inherits;

module.exports = ParseError;


function ParseError(message) {
    this.message = message;
}
inherits(ParseError, Error);

ParseError.unexpected = function (unexpectedValue, expectedValue) {
    return new ParseError("Unexpected '" + unexpectedValue + "', expected '" + expectedValue + "' instead.");
}
