'use strict';

var inherits = require('util').inherits;
var Value = require('./value');

module.exports = Keyword;


function Keyword(keyword) {
    this.keyword = keyword;
}
inherits(Keyword, Value);
