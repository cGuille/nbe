'use strict';

var inherits = require('util').inherits;
var _ = require('lodash');

module.exports = Node;


function Node() {
}

Node.prototype.printTree = function () {
    console.log(tree('', '', this));
};

var TREE_INDENT_WITH = '  ';
function tree(treeStr, prefix, node) {
    treeStr += (prefix + node.toString() + '\n');
    if (node.children) {
        _(node.children).forEach(function (child) {
            treeStr = tree(treeStr, prefix + TREE_INDENT_WITH, child);
        });
    }
    return treeStr;
}
