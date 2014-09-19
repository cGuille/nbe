'use strict';

var inherits = require("util").inherits;
var _ = require('lodash');
var Node = require('./node');

module.exports = ElementNode;


function ElementNode(tagName, attributes, children) {
    ElementNode.super_.call(this);
    this.tagName = tagName;
    this.attributes = attributes || {};
    this.children = children || [];
}
inherits(ElementNode, Node);

ElementNode.prototype.appendText = function (content) {
    this.children.push(Node.createTextNode(content));
};

ElementNode.prototype.toString = function () {
    var attributes = '';
    if (_(this.attributes).size() > 0) {
        attributes = ' ' + _(this.attributes).map(function (value, name) {
            return name + '="' + value + '"';
        }).join(' ');
    }
    return '<' + this.tagName + attributes + '>[' + this.children.length + ']';
};
