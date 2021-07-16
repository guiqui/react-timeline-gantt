"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderItem = void 0;
var react_1 = __importDefault(require("react"));
var HeaderItem = function (props) {
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeft: 'solid 1px white',
            position: 'absolute',
            height: 20,
            left: props.left,
            width: props.width
        } },
        react_1.default.createElement("div", null, props.label)));
};
exports.HeaderItem = HeaderItem;
