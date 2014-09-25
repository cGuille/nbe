'use strict';

var _ = require('lodash');

module.exports = Rule;


function Rule(selectors, declarations) {
    this.selectors = selectors || [];
    this.declarations = declarations || {};
}

Rule.prototype.toString = function () {
    var selectors = this.selectors.map(function (selector) {
        return selector.toString();
    }).join('\n');

    var declarations = _(this.declarations).map(function (value, property) {
        return property + ': ' + value.toString();
    }).join('\n');

    return selectors + '\n' + declarations;
};
