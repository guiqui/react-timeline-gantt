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
var TimeLine_1 = __importDefault(require("../../TimeLine"));
require("./App.css");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        var d1 = new Date();
        var d2 = new Date();
        d2.setDate(d2.getDate() + 5);
        var d3 = new Date();
        d3.setDate(d3.getDate() + 8);
        var d4 = new Date();
        d4.setDate(d4.getDate() + 20);
        _this.data = [
            { id: 1, start: d1, end: d2, name: 'Demo Task 1' },
            {
                id: 2,
                start: d3,
                end: d4,
                name: 'Demo Task 2'
            }
        ];
        _this.links = [{ id: 1, start: 1, end: 2 }];
        return _this;
    }
    App.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "app-container" },
            react_1.default.createElement("h1", null, "Getting Started Demo"),
            react_1.default.createElement("div", { className: "time-line-container" },
                react_1.default.createElement(TimeLine_1.default, { data: this.data, links: this.links }))));
    };
    return App;
}(react_1.Component));
exports.default = App;
