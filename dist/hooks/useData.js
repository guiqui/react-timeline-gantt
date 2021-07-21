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
exports.useData = exports.useDataItem = void 0;
var react_1 = require("react");
var context_1 = require("../context");
var useDataItem = function (id) {
    var data = react_1.useContext(context_1.TimelineContext).data;
    var item = data === null || data === void 0 ? void 0 : data.map(function (x, ix) { return (__assign(__assign({}, x), { index: ix })); }).find(function (a) { return a.id == id; });
    return item; //data?.map((x, ix) => ({...x, index: ix})).find((a) => a.id == id)
};
exports.useDataItem = useDataItem;
var useData = function () {
    var data = react_1.useContext(context_1.TimelineContext).data;
    return data === null || data === void 0 ? void 0 : data.map(function (x, ix) { return (__assign(__assign({}, x), { index: ix })); });
};
exports.useData = useData;
