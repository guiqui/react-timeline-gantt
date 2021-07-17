"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundStripe = void 0;
var react_1 = __importDefault(require("react"));
var BackgroundStripe = function (props) {
    return (react_1.default.createElement("div", { style: {
            position: 'absolute',
            background: props.background,
            left: props.left,
            height: '100%',
            width: props.width + "px"
        } }));
};
exports.BackgroundStripe = BackgroundStripe;
