'use strict';

var _ = require('lodash');

module.exports = Stylesheet;


function Stylesheet(rules) {
    this.rules = rules || [];
}
