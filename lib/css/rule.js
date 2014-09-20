'use strict';

var _ = require('lodash');

module.exports = Rule;


function Rule(selectors, declarations) {
    this.selectors = selectors || [];
    this.declarations = declarations || {};
}
