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
var Link_1 = __importDefault(require("./Link"));
var CreateLink = /** @class */ (function (_super) {
    __extends(CreateLink, _super);
    function CreateLink(props) {
        var _this = _super.call(this, props) || this;
        _this.doMouseMove = function (e) {
            if (!_this.init) {
                _this.lastX = e.clientX;
                _this.lastY = e.clientY;
                _this.init = true;
            }
            var newX = _this.state.x + (e.clientX - _this.lastX);
            var newY = _this.state.y + (e.clientY - _this.lastY);
            _this.lastX = e.clientX;
            _this.lastY = e.clientY;
            _this.setState({ x: newX, y: newY });
        };
        _this.doMouseUp = function (e) {
            _this.props.onFinishCreateLink();
        };
        _this.state = { x: _this.props.start.x, y: _this.props.start.y };
        _this.init = false;
        _this.lastX = -1;
        _this.lastY = -1;
        return _this;
    }
    CreateLink.prototype.componentDidMount = function () {
        document.addEventListener('mousemove', this.doMouseMove);
        document.addEventListener('mouseup', this.doMouseUp);
    };
    CreateLink.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousemove', this.doMouseMove);
        document.removeEventListener('mouseup', this.doMouseUp);
    };
    CreateLink.prototype.render = function () {
        return react_1.default.createElement(Link_1.default, { key: -1, start: { x: this.props.start.x, y: this.props.start.y }, end: { x: this.state.x, y: this.state.y } });
    };
    return CreateLink;
}(react_1.Component));
exports.default = CreateLink;
