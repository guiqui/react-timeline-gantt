"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Config_1 = __importDefault(require("../../helpers/config/Config"));
var VerticalSpliter = /** @class */ (function (_super) {
    __extends(VerticalSpliter, _super);
    function VerticalSpliter(props) {
        var _this = _super.call(this, props) || this;
        _this.doMouseMove = _this.doMouseMove.bind(_this);
        _this.doMouseDown = _this.doMouseDown.bind(_this);
        _this.doMouseUp = _this.doMouseUp.bind(_this);
        _this.state = { dragging: false };
        return _this;
    }
    VerticalSpliter.prototype.doMouseDown = function (e) {
        if (e.button === 0) {
            this.draggingPosition = e.clientX;
            this.setState({ dragging: true });
        }
    };
    VerticalSpliter.prototype.componentDidUpdate = function (props, state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.doMouseMove);
            document.addEventListener('mouseup', this.doMouseUp);
        }
        else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.doMouseMove);
            document.removeEventListener('mouseup', this.doMouseUp);
        }
    };
    VerticalSpliter.prototype.doMouseMove = function (e) {
        if (this.state.dragging) {
            e.stopPropagation();
            var delta = this.draggingPosition - e.clientX;
            this.draggingPosition = e.clientX;
            this.props.onTaskListSizing(delta);
        }
    };
    VerticalSpliter.prototype.doMouseUp = function (e) {
        this.setState({ dragging: false });
    };
    VerticalSpliter.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "verticalResizer", style: Config_1.default.values.taskList.verticalSeparator.style, onMouseDown: this.doMouseDown },
            react_1.default.createElement("div", { className: "squareGrip", style: Config_1.default.values.taskList.verticalSeparator.grip.style }),
            react_1.default.createElement("div", { className: "squareGrip", style: Config_1.default.values.taskList.verticalSeparator.grip.style }),
            react_1.default.createElement("div", { className: "squareGrip", style: Config_1.default.values.taskList.verticalSeparator.grip.style }),
            react_1.default.createElement("div", { className: "squareGrip", style: Config_1.default.values.taskList.verticalSeparator.grip.style })));
    };
    return VerticalSpliter;
}(react_1.Component));
exports.default = VerticalSpliter;
