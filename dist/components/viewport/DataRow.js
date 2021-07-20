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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var grommet_1 = require("grommet");
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var Config_1 = __importDefault(require("../../helpers/config/Config"));
var DataRow = /** @class */ (function (_super) {
    __extends(DataRow, _super);
    function DataRow(props) {
        return _super.call(this, props) || this;
    }
    DataRow.prototype.render = function () {
        return (react_1.default.createElement(grommet_1.Box, { className: "timeLine-main-data-row", style: __assign(__assign({}, Config_1.default.values.dataViewPort.rows.style), { top: this.props.top, height: this.props.itemheight, borderBottom: '2px dashed #d3d3d350', strokeDasharray: 1000, strokeDashoffset: 1000 }) }, this.props.children));
    };
    return DataRow;
}(react_2.Component));
exports.default = DataRow;
