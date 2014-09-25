'use strict';

var inherits = require('util').inherits;
var format = require('util').format;
var Value = require('./value');

module.exports = Color;


function Color(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
}
inherits(Color, Value);

Color.prototype.toString = function () {
    return format(
        'rgba(%s, %s, %s, %s)',
        this.red,
        this.green,
        this.blue,
        this.alpha
    );
};
