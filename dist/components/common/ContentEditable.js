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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ContentEditable = /** @class */ (function (_super) {
    __extends(ContentEditable, _super);
    function ContentEditable(props) {
        var _this = _super.call(this, props) || this;
        _this.textInput = react_1.default.createRef();
        _this.onFocus = function () {
            _this.setState({ editing: true });
        };
        _this.onBlur = function () {
            _this.finishEditing();
        };
        _this.handleKey = function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                _this.finishEditing();
            }
        };
        _this.finishEditing = function () {
            _this.isFocus = false;
            _this.setState({ editing: false });
            if (_this.props.onChange)
                _this.props.onChange(_this.state.value);
        };
        _this.handleChange = function (e) {
            _this.setState({ value: e.target.value });
        };
        _this.renderDiv = function () {
            return (react_1.default.createElement("div", { tabIndex: _this.props.index, onClick: _this.onFocus, onFocus: _this.onFocus, style: { width: '100%' } },
                ' ',
                _this.state.value));
        };
        _this.renderEditor = function () {
            return (react_1.default.createElement("input", { ref: _this.textInput, onBlur: _this.onBlur, style: { width: '100%', outlineColor: 'black', outlineStyle: 'oinset' }, type: "text", name: "name", value: _this.state.value, onKeyUp: _this.handleKey, onChange: _this.handleChange }));
        };
        _this.isFocus = false;
        _this.state = {
            editing: false,
            value: _this.props.value
        };
        return _this;
    }
    ContentEditable.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.textInput.current && !this.isFocus) {
            this.textInput.current.focus();
            this.isFocus = true;
        }
    };
    ContentEditable.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (nextProps.value != this.props.value) {
            this.setState({ value: nextProps.value });
        }
        return true;
    };
    ContentEditable.prototype.render = function () {
        return this.state.editing ? this.renderEditor() : this.renderDiv();
    };
    return ContentEditable;
}(react_1.Component));
exports.default = ContentEditable;
