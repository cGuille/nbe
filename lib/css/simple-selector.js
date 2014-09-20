'use strict';

var _ = require('lodash');

module.exports = SimpleSelector;


function SimpleSelector(tagName, id, classNames) {
    this.tagName = tagName;
    this.id = id;
    this.classNames = classNames || [];
}
SimpleSelector.getMostSpecific = function (first, latest) {
    if (first.id && !latest.id) {
        return first;
    }
    if (!first.id && latest.id) {
        return latest;
    }

    if (first.classNames.length > latest.classNames.length) {
        return first;
    }
    if (first.classNames.length < latest.classNames.length) {
        return latest;
    }

    if (first.tagName && !latest.tagName) {
        return first;
    }
    if (!first.tagName && latest.tagName) {
        return latest;
    }

    return latest;
};
