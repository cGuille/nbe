'use strict';

var inherits = require('util').inherits;
var Value = require('./value');

module.exports = Length;


function Length(size, unit) {
    this.size = size;
    this.unit = unit;
}
inherits(Length, Value);
