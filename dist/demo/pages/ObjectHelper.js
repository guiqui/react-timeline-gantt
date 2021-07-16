"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectHelper = /** @class */ (function () {
    function ObjectHelper() {
    }
    ObjectHelper.prototype.genID = function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
    };
    ObjectHelper.prototype.deepClone = function (obj) {
        if (!this.isObject(obj))
            return obj;
        var result = __assign({}, obj);
        for (var key in result) {
            result[key] = this.deepClone(result[key]);
        }
        return result;
    };
    ObjectHelper.prototype.isObject = function (value) {
        if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number')
            return false;
        return true;
    };
    return ObjectHelper;
}());
var instanceObjectHelper = new ObjectHelper();
exports.default = instanceObjectHelper;
