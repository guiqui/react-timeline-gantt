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
exports.TaskRow = exports.VerticalLine = void 0;
var grommet_1 = require("grommet");
var react_1 = __importStar(require("react"));
var Config_1 = __importDefault(require("../../helpers/config/Config"));
var ContentEditable_1 = __importDefault(require("../common/ContentEditable"));
var VerticalLine = /** @class */ (function (_super) {
    __extends(VerticalLine, _super);
    function VerticalLine(props) {
        return _super.call(this, props) || this;
    }
    VerticalLine.prototype.render = function () {
        return react_1.default.createElement("div", { className: "timeLine-main-data-verticalLine", style: { left: this.props.left } });
    };
    return VerticalLine;
}(react_1.Component));
exports.VerticalLine = VerticalLine;
var TaskRow = /** @class */ (function (_super) {
    __extends(TaskRow, _super);
    function TaskRow(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (value) {
            if (_this.props.onUpdateTask) {
                _this.props.onUpdateTask(_this.props.item, { name: value });
            }
        };
        return _this;
    }
    TaskRow.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(grommet_1.Box, { direction: "row", className: "timeLine-side-task-row", style: __assign(__assign({}, Config_1.default.values.taskList.task.style), { top: this.props.top, height: this.props.itemheight + 5 }), onClick: function (e) { return _this.props.onSelectItem(_this.props.item); } },
            react_1.default.createElement("div", { className: "color-dot", style: { width: 5, height: 5, borderRadius: 10, background: this.props.item.color } }),
            this.props.nonEditable ? (react_1.default.createElement(grommet_1.Box, { tabIndex: this.props.index }, this.props.label)) : (react_1.default.createElement(ContentEditable_1.default, { value: this.props.label, index: this.props.index, onChange: this.onChange }))));
    };
    return TaskRow;
}(react_1.Component));
exports.TaskRow = TaskRow;
//Task Lis
var TaskList = /** @class */ (function (_super) {
    __extends(TaskList, _super);
    function TaskList(props) {
        var _this = _super.call(this, props) || this;
        _this.taskViewRef = react_1.default.createRef();
        _this.doScroll = function () {
            if (_this.taskViewRef.current)
                _this.props.onScroll(_this.taskViewRef.current.scrollTop);
        };
        return _this;
    }
    TaskList.prototype.getContainerStyle = function (rows) {
        var new_height = rows > 0 ? rows * this.props.itemheight : 10;
        return { height: new_height };
    };
    TaskList.prototype.renderTaskRow = function (data) {
        var result = [];
        for (var i = this.props.startRow; i < this.props.endRow + 1; i++) {
            var item = data[i];
            if (!item)
                break;
            result.push(react_1.default.createElement(TaskRow, { key: i, index: i, item: item, label: item.name, top: i * (this.props.itemheight + 5), itemheight: this.props.itemheight, isSelected: this.props.selectedItem == item, onUpdateTask: this.props.onUpdateTask, onSelectItem: this.props.onSelectItem, nonEditable: this.props.nonEditable }));
        }
        return result;
    };
    TaskList.prototype.render = function () {
        var data = this.props.data ? this.props.data : [];
        this.containerStyle = this.getContainerStyle(data.length);
        return (react_1.default.createElement(grommet_1.Box, { className: "timeLine-side" },
            react_1.default.createElement(grommet_1.Box, { height: '60px', background: "dark-2", elevation: "small", pad: "small", align: "center", justify: "center", direction: "row" },
                react_1.default.createElement("div", null, Config_1.default.values.taskList.title.label)),
            react_1.default.createElement(grommet_1.Box, { ref: this.taskViewRef, className: "timeLine-side-task-viewPort", onScroll: this.doScroll },
                react_1.default.createElement(grommet_1.Box, { className: "timeLine-side-task-container", style: this.containerStyle }, this.renderTaskRow(data)))));
    };
    return TaskList;
}(react_1.Component));
exports.default = TaskList;
