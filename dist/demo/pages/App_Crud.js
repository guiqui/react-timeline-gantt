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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
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
        _this.onUpdateTask = function (item, props) {
            item.start = props.start ? props.start : item.start;
            item.end = props.end ? props.end : item.end;
            item.name = props.name ? props.name : item.name;
            _this.setState({ data: __spreadArray([], _this.state.data) });
        };
        _this.onCreateLink = function (item) {
            var newLink = _this.createLink(item.start, item.end);
            _this.setState({ links: __spreadArray(__spreadArray([], _this.state.links), [newLink]), selectedItem: newLink });
        };
        _this.onSelectItem = function (item) {
            console.log("Select Item " + item);
            _this.setState({ selectedItem: item });
        };
        _this.addTask = function () {
            var newTask = {
                id: _this.state.data.length + 1,
                start: new Date(),
                end: _this.getRandomDate(),
                name: 'New Task',
                color: _this.getRandomColor()
            };
            _this.setState({ data: __spreadArray([newTask], _this.state.data) });
        };
        _this.delete = function () {
            console.log('On delete');
            if (_this.state.selectedItem) {
                var index = _this.state.links.indexOf(_this.state.selectedItem);
                if (index > -1) {
                    _this.state.links.splice(index, 1);
                    _this.setState({ links: __spreadArray([], _this.state.links) });
                }
                index = _this.state.data.indexOf(_this.state.selectedItem);
                if (index > -1) {
                    _this.state.data.splice(index, 1);
                    _this.setState({ data: __spreadArray([], _this.state.data) });
                }
            }
        };
        var d1 = new Date();
        var d2 = new Date();
        d2.setDate(d2.getDate() + 5);
        var d3 = new Date();
        d3.setDate(d3.getDate() + 8);
        var d4 = new Date();
        d4.setDate(d4.getDate() + 20);
        var data = [
            {
                id: 1,
                start: d1,
                end: d2,
                name: 'Demo Task 1'
            },
            {
                id: 2,
                start: d3,
                end: d4,
                name: 'Demo Task 2',
                color: 'orange'
            }
        ];
        _this.state = { data: data, links: [], selectedItem: null };
        return _this;
    }
    App.prototype.genID = function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
    };
    App.prototype.getRandomDate = function () {
        var result = new Date();
        result.setDate(result.getDate() + Math.random() * 10);
        return result;
    };
    App.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    App.prototype.createLink = function (start, end) {
        return {
            id: this.genID(),
            start: start.task.id,
            end: end.task.id
        };
    };
    App.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "app-container" },
            react_1.default.createElement("div", { className: "nav-container" },
                react_1.default.createElement("div", { className: "mode-container-title" }, "Crud Demo"),
                react_1.default.createElement("div", { className: "operation-button-container" },
                    react_1.default.createElement("div", { className: "mode-button", onClick: this.addTask },
                        react_1.default.createElement("svg", { height: 30, width: 30, viewBox: "0 0 48 48" },
                            react_1.default.createElement("path", { fill: "silver", d: "M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z" }))),
                    react_1.default.createElement("div", { className: "mode-button", onClick: this.delete },
                        react_1.default.createElement("svg", { height: 30, width: 30, viewBox: "0 0 48 48" },
                            react_1.default.createElement("path", { fill: "silver", d: "M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22H14v-4h20v4z" }))))),
            react_1.default.createElement("div", { className: "time-line-container" },
                react_1.default.createElement(TimeLine_1.default, { data: this.state.data, links: this.state.links, onUpdateTask: this.onUpdateTask, onCreateLink: this.onCreateLink, onSelectItem: this.onSelectItem, selectedItem: this.state.selectedItem }))));
    };
    return App;
}(react_1.Component));
exports.default = App;
