'use strict';

var inherits = require('util').inherits;
var Parser = require('./parser');
var ParseError = require('./error/parse');
var Dom = require('../dom');

module.exports = HtmlParser;


function HtmlParser(input) {
    HtmlParser.super_.call(this, input);
}
inherits(HtmlParser, Parser);

HtmlParser.prototype.parseNode = function () {
    if (this.getNextChar() === '<') {
        return this.parseElement();
    } else {
        return this.parseText();
    }
};

HtmlParser.prototype.parseText = function () {
    return new Dom.TextNode(this.consumeWhile(function (nextChar) {
        return nextChar !== '<';
    }));
};

HtmlParser.prototype.parseQuotedValue = function () {
    var result = '';

    this.ensureNextCharIs('"');
    result = this.consumeWhile(function (nextChar) {
        return nextChar !== '"';
    });
    this.ensureNextCharIs('"');

    return result;
};

HtmlParser.prototype.parseAttribute = function () {
    var attribute = {};

    attribute['name'] = this.consumeToken();
    this.ensureNextCharIs('=');
    attribute['value'] = this.parseQuotedValue();

    return attribute;
};

HtmlParser.prototype.parseAttributes = function () {
    var attributes = {};
    var attribute;

    this.consumeWhitespaces();
    while (this.getNextChar() !== '>') {
        attribute = this.parseAttribute();
        attributes[attribute.name] = attribute.value;
        this.consumeWhitespaces();
    }

    return attributes;
};

HtmlParser.prototype.parseElement = function () {
    var tagName;
    var attributes;
    var children;
    var closingTagName;

    this.ensureNextCharIs('<');
    tagName = this.consumeToken();
    attributes = this.parseAttributes();
    this.ensureNextCharIs('>');
    children = this.parseNodes();
    this.ensureNextCharIs('<');
    this.ensureNextCharIs('/');
    closingTagName = this.consumeToken();
    if (tagName !== closingTagName) {
        throw ParseError.unexpected(closingTagName, tagName);
    }
    this.ensureNextCharIs('>');

    return new Dom.ElementNode(tagName, attributes, children);
};

HtmlParser.prototype.parseNodes = function () {
    var nodes = [];

    this.consumeWhitespaces();
    while (!this.isAtEof() && !this.startsWith('</')) {
        nodes.push(this.parseNode());
        this.consumeWhitespaces();
    }

    return nodes;
};

HtmlParser.prototype.parse = function () {
    var nodes = this.parseNodes();
    return nodes.length === 1 ? nodes[0] : new Dom.ElementNode('html', null, nodes);
};
