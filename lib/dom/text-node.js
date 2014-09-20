'use strict';

var inherits = require('util').inherits;
var Node = require('./node');

module.exports = TextNode;


function TextNode(content) {
    TextNode.super_.call(this);
    this.content = content;
}
inherits(TextNode, Node);

TextNode.prototype.toString = function () {
    var content = this.content.replace(/\r/g, '\\r').replace(/\n/g, '\\n');
    return '[TextNode=' + content + ']';
};
