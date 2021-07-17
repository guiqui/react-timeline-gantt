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
var SSHAPE_SIDE_WIDTH = 20;
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link(props) {
        var _this = _super.call(this, props) || this;
        _this.calcNormCoordinates = function () {
            var cpt1 = { x: 0, y: 0 };
            var cpt2 = { x: 0, y: 0 };
            var middle = 0;
            middle = _this.props.start.x + (_this.props.end.x - _this.props.start.x) / 2;
            cpt1 = { x: middle, y: _this.props.start.y };
            cpt2 = { x: middle, y: _this.props.end.y };
            return { cpt1: cpt1, cpt2: cpt2 };
        };
        _this.calcSCoordinates = function () {
            var cpt1 = { x: _this.props.start.x + SSHAPE_SIDE_WIDTH, y: _this.props.start.y };
            var halfY = (_this.props.end.y - _this.props.start.y) / 2;
            var cpt2 = { x: cpt1.x, y: cpt1.y + halfY };
            var cpt3 = { x: _this.props.end.x - SSHAPE_SIDE_WIDTH, y: cpt2.y };
            var cpt4 = { x: cpt3.x, y: cpt3.y + halfY };
            return { cpt1: cpt1, cpt2: cpt2, cpt3: cpt3, cpt4: cpt4 };
        };
        _this.getPath = function (coords) {
            var coordinates = null;
            if (_this.props.start.x > _this.props.end.x) {
                coordinates = _this.calcSCoordinates();
                return "M" + _this.props.start.x + " " + _this.props.start.y + "  " + coordinates.cpt1.x + " " + coordinates.cpt1.y + " " + coordinates.cpt2.x + " " + coordinates.cpt2.y + " " + coordinates.cpt3.x + " " + coordinates.cpt3.y + " " + coordinates.cpt4.x + " " + coordinates.cpt4.y + " " + _this.props.end.x + " " + _this.props.end.y;
            }
            else {
                coordinates = _this.calcNormCoordinates();
                return "M" + _this.props.start.x + " " + _this.props.start.y + "  " + coordinates.cpt1.x + " " + coordinates.cpt1.y + " " + coordinates.cpt2.x + " " + coordinates.cpt2.y + " " + _this.props.end.x + " " + _this.props.end.y;
            }
        };
        _this.onSelect = function (e) {
            if (_this.props.onSelectItem)
                _this.props.onSelectItem(_this.props.item);
        };
        return _this;
    }
    Link.prototype.render = function () {
        var pathColor = this.props.isSelected ? Config_1.default.values.links.selectedColor : Config_1.default.values.links.color;
        return (react_1.default.createElement("g", { className: "timeline-link" },
            react_1.default.createElement("path", { pointerEvents: "stroke", onMouseDown: this.onSelect, stroke: "white", d: this.getPath(), strokeLinejoin: "round", fill: "transparent", strokeWidth: "4", cursor: "pointer" }),
            react_1.default.createElement("path", { pointerEvents: "stroke", onMouseDown: this.onSelect, stroke: pathColor, d: this.getPath(), strokeLinejoin: "round", fill: "transparent", strokeWidth: "1", cursor: "pointer", markerEnd: "url(#arrow)" })));
    };
    return Link;
}(react_1.Component));
exports.default = Link;
