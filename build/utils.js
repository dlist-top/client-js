"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyValue = void 0;
var getKeyValue = function (obj) { return function (key) {
    return obj[key];
}; };
exports.getKeyValue = getKeyValue;
