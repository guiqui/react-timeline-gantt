"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeSelector = void 0;
var react_1 = __importStar(require("react"));
var context_1 = require("../../context");
var ModeSelector = function (props) {
    var _a = react_1.useContext(context_1.TimelineContext), mode = _a.mode, changeMode = _a.changeMode;
    var onChange = function (mode) {
        var _a;
        changeMode === null || changeMode === void 0 ? void 0 : changeMode(mode);
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, mode);
    };
    var getButtonStyle = function (value) {
        return mode == value ? { backgroundColor: 'grey', boder: 'solid 1px #223344' } : {};
    };
    return (react_1.default.createElement("div", { className: "mode-container" },
        react_1.default.createElement("div", { className: "mode-container-item mode-container-item-left", onClick: function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange('day'); }, style: getButtonStyle('day') }, "Day"),
        react_1.default.createElement("div", { className: "mode-container-item", onClick: function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange('week'); }, style: getButtonStyle('week') }, "Week"),
        react_1.default.createElement("div", { className: "mode-container-item", onClick: function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange('month'); }, style: getButtonStyle('month') }, "Month"),
        react_1.default.createElement("div", { className: "mode-container-item mode-container-item-right", onClick: function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange('year'); }, style: getButtonStyle('year') }, "Year")));
};
exports.ModeSelector = ModeSelector;
