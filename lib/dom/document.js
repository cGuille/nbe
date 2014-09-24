'use strict';

var _ = require('lodash');
var CssParser = require('../parser/css')
var TextNode = require('./text-node');

module.exports = Document;


function Document(rootNode, styleTags) {
    this.rootNode = rootNode;
    this.stylesheets = (styleTags || []).map(function (styleElement) {
        var styleElementFirstChild = styleElement.children[0];
        var input = styleElementFirstChild instanceof TextNode ?
            styleElementFirstChild.content :
            '';

        return new CssParser(input).parse();
    });
}

Document.prototype.printTree = function () {
    if (_(this.rootNode).isUndefined()) {
        console.log('Empty document');
    } else {
        this.rootNode.printTree();
    }
};
