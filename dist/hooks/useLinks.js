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
exports.useLinks = exports.useLink = exports.useTaskLinks = void 0;
var react_1 = require("react");
var context_1 = require("../context");
var useTaskLinks = function (task_id) {
    var links = react_1.useContext(context_1.TimelineContext).links;
    return links === null || links === void 0 ? void 0 : links.map(function (x, ix) { return (__assign(__assign({}, x), { index: ix })); }).filter(function (a) { return a.source == task_id || a.target || task_id; });
};
exports.useTaskLinks = useTaskLinks;
var useLink = function (id) {
    var links = react_1.useContext(context_1.TimelineContext).links;
    console.log(links, id);
    if (!id) {
        //  return addLink(id)
    }
    ;
    return links === null || links === void 0 ? void 0 : links.map(function (x, ix) { return (__assign(__assign({}, x), { index: ix })); }).find(function (a) { return a.id == id; });
};
exports.useLink = useLink;
var useLinks = function () {
    var links = react_1.useContext(context_1.TimelineContext).links;
    return links === null || links === void 0 ? void 0 : links.map(function (x, ix) { return (__assign(__assign({}, x), { index: ix })); });
};
exports.useLinks = useLinks;
