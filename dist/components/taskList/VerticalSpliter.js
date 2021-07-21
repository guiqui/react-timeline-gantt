"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var Config_1 = __importDefault(require("../../helpers/config/Config"));
var grommet_icons_1 = require("grommet-icons");
var VerticalSpliter = function (props) {
    var verticalRef = react_1.useRef(null);
    var dragging = react_1.useRef(false);
    var _a = react_1.useState(false), isDragging = _a[0], _setDragging = _a[1];
    var setDragging = function (val) {
        dragging.current = val;
        _setDragging(val);
    };
    var draggingPosition = react_1.useRef(0);
    var onMouseDown = function (e) {
        if (e.button === 0) {
            console.log("MOUSE DOWN");
            draggingPosition.current = e.clientX;
            setDragging(true);
            var cleanup_1 = function () {
                console.log("CLEANUP");
                setDragging(false);
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', cleanup_1);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', cleanup_1);
        }
    };
    var onMouseMove = function (e) {
        var _a;
        if (dragging.current) {
            e.stopPropagation();
            console.log("MOUSEMOVE", e);
            var bounds = draggingPosition.current || 0;
            var delta = bounds - e.clientX; //
            draggingPosition.current = e.clientX;
            if (delta > 0)
                console.log("delta", delta);
            (_a = props.onTaskListSizing) === null || _a === void 0 ? void 0 : _a.call(props, e.clientX + 6);
        }
    };
    console.log("Dragging", dragging.current);
    return (react_1.default.createElement("div", { ref: verticalRef, className: props.className + " " + (isDragging == true ? 'dragging' : ''), style: Config_1.default.values.taskList.verticalSeparator.style, onMouseDown: onMouseDown },
        react_1.default.createElement(grommet_icons_1.CaretLeftFill, null),
        react_1.default.createElement(grommet_icons_1.CaretRightFill, null)));
};
exports.default = styled_components_1.default(VerticalSpliter)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 5px;\n  transition: width 100ms ease-out;\n  cursor: col-resize;\n\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n\n  & svg{\n    transition opacity 100ms ease-out;\n  }\n  &:not(:hover) svg{\n    opacity: 0;\n  }\n\n  &:hover svg{\n    opacity: 1;\n  }\n\n  &:hover{\n    width: 13px;\n  }\n  &.dragging{\n    width: 13px;\n  }\n"], ["\n  width: 5px;\n  transition: width 100ms ease-out;\n  cursor: col-resize;\n\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n\n  & svg{\n    transition opacity 100ms ease-out;\n  }\n  &:not(:hover) svg{\n    opacity: 0;\n  }\n\n  &:hover svg{\n    opacity: 1;\n  }\n\n  &:hover{\n    width: 13px;\n  }\n  &.dragging{\n    width: 13px;\n  }\n"])));
var templateObject_1;
