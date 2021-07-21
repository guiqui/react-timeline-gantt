"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderItem = exports.BaseHeaderItem = void 0;
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var BaseHeaderItem = function (props) {
    return (react_1.default.createElement("div", { className: props.className, style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeft: 'solid 1px rgb(216, 217, 218)',
            position: 'absolute',
            height: 20,
            left: props.left,
            width: props.width,
            cursor: 'pointer'
        } },
        react_1.default.createElement("div", null, props.label)));
};
exports.BaseHeaderItem = BaseHeaderItem;
exports.HeaderItem = styled_components_1.default(exports.BaseHeaderItem)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  \n    &:hover{\n        background: rgba(127, 127, 127, 0.3);\n    }\n  "], ["\n  \n    &:hover{\n        background: rgba(127, 127, 127, 0.3);\n    }\n  "])));
var templateObject_1;
