'use strict';

var _ = require('lodash');

module.exports = Stylesheet;


function Stylesheet(rules) {
    this.rules = rules || [];
}

Stylesheet.prototype.toString = function () {
    return this.rules.map(function (rule) {
        return rule.toString() + '\n';
    }).join('\n');
};
