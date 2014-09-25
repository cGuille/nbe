'use strict';

var inherits = require('util').inherits;
var Value = require('./value');

module.exports = Length;


function Length(size, unit) {
    this.size = size;
    this.unit = unit;
}
inherits(Length, Value);

Length.prototype.toString = function () {
    return '[size=' + this.size + ', unit=' + this.unit + ']';
};
