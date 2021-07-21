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
var react_1 = __importStar(require("react"));
var DateHelper_1 = __importDefault(require("../../helpers/DateHelper"));
var Const_1 = require("../../Const");
var Const_2 = require("../../Const");
var Config_1 = __importDefault(require("../../helpers/config/Config"));
var grommet_1 = require("grommet");
var DataTask = /** @class */ (function (_super) {
    __extends(DataTask, _super);
    function DataTask(props) {
        var _this = _super.call(this, props) || this;
        _this.onCreateLinkMouseDown = function (e, position) {
            var _a, _b;
            if (e.button === 0) {
                e.stopPropagation();
                (_b = (_a = _this.props).onStartCreateLink) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props.item, position);
            }
        };
        _this.onCreateLinkMouseUp = function (e, position) {
            e.stopPropagation();
            _this.props.onFinishCreateLink(_this.props.item, position);
        };
        _this.onCreateLinkTouchStart = function (e, position) {
            var _a, _b;
            e.stopPropagation();
            (_b = (_a = _this.props).onStartCreateLink) === null || _b === void 0 ? void 0 : _b.call(_a, _this.props.item, position);
        };
        _this.onCreateLinkTouchEnd = function (e, position) {
            e.stopPropagation();
            _this.props.onFinishCreateLink(_this.props.item, position);
        };
        _this.doMouseDown = function (e, mode) {
            if (!_this.props.onUpdateTask)
                return;
            if (e.button === 0) {
                e.stopPropagation();
                _this.dragStart(e.clientX, mode);
            }
        };
        _this.doMouseMove = function (e) {
            if (_this.state.dragging) {
                e.stopPropagation();
                _this.dragProcess(e.clientX);
            }
        };
        _this.doMouseUp = function () {
            _this.dragEnd();
        };
        _this.doTouchStart = function (e, mode) {
            if (!_this.props.onUpdateTask)
                return;
            console.log('start');
            e.stopPropagation();
            _this.dragStart(e.touches[0].clientX, mode);
        };
        _this.doTouchMove = function (e) {
            if (_this.state.dragging) {
                console.log('move');
                e.stopPropagation();
                _this.dragProcess(e.changedTouches[0].clientX);
            }
        };
        _this.doTouchEnd = function (e) {
            console.log('end');
            _this.dragEnd();
        };
        _this.calculateStyle = _this.calculateStyle.bind(_this);
        _this.state = { dragging: false, left: _this.props.left || 0, width: _this.props.width || 0, mode: Const_1.MODE_NONE };
        return _this;
    }
    DataTask.prototype.componentDidUpdate = function (props, state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.doMouseMove);
            document.addEventListener('mouseup', this.doMouseUp);
            document.addEventListener('touchmove', this.doTouchMove);
            document.addEventListener('touchend', this.doTouchEnd);
        }
        else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.doMouseMove);
            document.removeEventListener('mouseup', this.doMouseUp);
            document.removeEventListener('touchmove', this.doTouchMove);
            document.removeEventListener('touchend', this.doTouchEnd);
        }
    };
    DataTask.prototype.updatePosition = function () {
        var new_start_date = DateHelper_1.default.pixelToDate(this.state.left, this.props.nowposition, this.props.dayWidth || 0);
        var new_end_date = DateHelper_1.default.pixelToDate(this.state.left + this.state.width, this.props.nowposition, this.props.dayWidth || 0);
        this.props.onUpdateTask(this.props.item, { start: new_start_date, end: new_end_date });
    };
    DataTask.prototype.dragStart = function (x, mode) {
        this.props.onChildDrag(true);
        this.draggingPosition = x;
        this.setState({
            dragging: true,
            mode: mode,
            left: this.props.left || 0,
            width: this.props.width || 0
        });
    };
    DataTask.prototype.dragProcess = function (x) {
        var delta = this.draggingPosition - x;
        var newLeft = this.state.left;
        var newWidth = this.state.width;
        switch (this.state.mode) {
            case Const_1.MODE_MOVE:
                newLeft = this.state.left - delta;
                break;
            case Const_1.MOVE_RESIZE_LEFT:
                newLeft = this.state.left - delta;
                newWidth = this.state.width + delta;
                break;
            case Const_1.MOVE_RESIZE_RIGHT:
                newWidth = this.state.width - delta;
                break;
        }
        //the coordinates need to be global
        var changeObj = {
            item: this.props.item,
            position: { start: newLeft - this.props.nowposition, end: newLeft + newWidth - this.props.nowposition }
        };
        this.updatePosition();
        this.props.onTaskChanging(changeObj);
        this.setState({ left: newLeft, width: newWidth });
        this.draggingPosition = x;
    };
    DataTask.prototype.dragEnd = function () {
        this.props.onChildDrag(false);
        this.updatePosition();
        this.setState({ dragging: false, mode: Const_1.MODE_NONE });
    };
    DataTask.prototype.calculateStyle = function () {
        var configStyle = this.props.isSelected ? Config_1.default.values.dataViewPort.task.selectedStyle : Config_1.default.values.dataViewPort.task.style;
        var backgroundColor = this.props.color ? this.props.color : configStyle.backgroundColor;
        if (this.state.dragging) {
            return __assign(__assign({}, configStyle), { backgroundColor: backgroundColor, left: this.state.left, width: this.state.width, height: this.props.height - 5 });
        }
        else {
            return __assign(__assign({}, configStyle), { backgroundColor: backgroundColor, left: this.props.left, width: this.props.width, height: this.props.height - 5 });
        }
    };
    DataTask.prototype.render = function () {
        var _this = this;
        var style = this.calculateStyle();
        return (react_1.default.createElement(grommet_1.Box, { focusIndicator: false, elevation: 'medium' /*this.props.isSelected ? 'large': 'none'*/, onMouseDown: function (e) { return _this.doMouseDown(e, Const_1.MODE_MOVE); }, onTouchStart: function (e) { return _this.doTouchStart(e, Const_1.MODE_MOVE); }, onClick: function (e) {
                _this.props.onSelectItem(_this.props.item);
            }, style: __assign(__assign({}, style), { top: 3 }) },
            react_1.default.createElement("div", { className: "timeLine-main-data-task-side", style: { top: 0, left: -4, height: style.height }, onMouseDown: function (e) { return _this.doMouseDown(e, Const_1.MOVE_RESIZE_LEFT); }, onTouchStart: function (e) { return _this.doTouchStart(e, Const_1.MOVE_RESIZE_LEFT); } },
                react_1.default.createElement("div", { className: "timeLine-main-data-task-side-linker", onMouseUp: function (e) { return _this.onCreateLinkMouseUp(e, Const_2.LINK_POS_LEFT); }, onTouchEnd: function (e) { return _this.onCreateLinkTouchEnd(e, Const_2.LINK_POS_LEFT); } })),
            react_1.default.createElement("div", { style: { overflow: 'hidden' } }, Config_1.default.values.dataViewPort.task.showLabel ? this.props.item.name : ''),
            react_1.default.createElement("div", { className: "timeLine-main-data-task-side", style: { top: 0, left: style.width - 3, height: style.height }, onMouseDown: function (e) { return _this.doMouseDown(e, Const_1.MOVE_RESIZE_RIGHT); }, onTouchStart: function (e) { return _this.doTouchStart(e, Const_1.MOVE_RESIZE_RIGHT); } },
                react_1.default.createElement("div", { className: "timeLine-main-data-task-side-linker", onMouseDown: function (e) { return _this.onCreateLinkMouseDown(e, Const_2.LINK_POS_RIGHT); }, onTouchStart: function (e) { return _this.onCreateLinkTouchStart(e, Const_2.LINK_POS_RIGHT); } }))));
    };
    return DataTask;
}(react_1.Component));
exports.default = DataTask;
