'use strict';

var inherits = require('util').inherits;
var Value = require('./value');

module.exports = Color;


function Color(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
}
inherits(Color, Value);
