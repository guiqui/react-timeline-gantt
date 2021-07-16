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
exports.DataViewPort = void 0;
var react_1 = __importStar(require("react"));
var Const_1 = require("../../Const");
var DataTask_1 = __importDefault(require("./DataTask"));
var DataRow_1 = __importDefault(require("./DataRow"));
var DateHelper_1 = __importDefault(require("../../helpers/DateHelper"));
var sizeMe = require('react-sizeme');
var DataViewPort = /** @class */ (function (_super) {
    __extends(DataViewPort, _super);
    function DataViewPort(props) {
        var _this = _super.call(this, props) || this;
        _this.dataViewRef = react_1.createRef();
        _this.onChildDrag = function (dragging) {
            _this.childDragging = dragging;
        };
        _this.renderRows = function () {
            var result = [];
            for (var i = _this.props.startRow; i < _this.props.endRow + 1; i++) {
                var item = _this.props.data[i];
                if (!item)
                    break;
                //FIXME PAINT IN BOUNDARIES
                var new_position = DateHelper_1.default.dateToPixel(item.start, _this.props.nowposition, _this.props.dayWidth);
                var new_width = DateHelper_1.default.dateToPixel(item.end, _this.props.nowposition, _this.props.dayWidth) - new_position;
                result.push(react_1.default.createElement(DataRow_1.default, { key: i, label: item.name, top: i * _this.props.itemheight, left: 20, itemheight: _this.props.itemheight },
                    react_1.default.createElement(DataTask_1.default, { item: item, label: item.name, nowposition: _this.props.nowposition, dayWidth: _this.props.dayWidth, color: item.color, left: new_position, width: new_width, height: _this.props.itemheight, onChildDrag: _this.onChildDrag, isSelected: _this.props.selectedItem == item, onSelectItem: _this.props.onSelectItem, onStartCreateLink: _this.props.onStartCreateLink, onFinishCreateLink: _this.props.onFinishCreateLink, onTaskChanging: _this.props.onTaskChanging, onUpdateTask: _this.props.onUpdateTask }, ' ')));
            }
            return result;
        };
        _this.doMouseDown = function (e) {
            if (e.button === 0 && !_this.childDragging) {
                _this.props.onMouseDown(e);
            }
        };
        _this.doMouseMove = function (e) {
            _this.props.onMouseMove(e, _this.refs.dataViewPort);
        };
        _this.doTouchStart = function (e) {
            if (!_this.childDragging) {
                _this.props.onTouchStart(e);
            }
        };
        _this.doTouchMove = function (e) {
            _this.props.onTouchMove(e, _this.refs.dataViewPort);
        };
        _this.childDragging = false;
        return _this;
    }
    DataViewPort.prototype.getContainerHeight = function (rows) {
        var new_height = rows > 0 ? rows * this.props.itemheight : 10;
        return new_height;
    };
    DataViewPort.prototype.componentDidMount = function () {
        if (this.dataViewRef.current)
            this.dataViewRef.current.scrollLeft = 0;
    };
    DataViewPort.prototype.render = function () {
        if (this.dataViewRef.current) {
            this.dataViewRef.current.scrollLeft = this.props.scrollLeft;
            this.dataViewRef.current.scrollTop = this.props.scrollTop;
        }
        var height = this.getContainerHeight(this.props.data.length);
        return (react_1.default.createElement("div", { ref: this.dataViewRef, id: "timeLinedataViewPort", className: "timeLine-main-data-viewPort", onMouseDown: this.doMouseDown, onMouseMove: this.doMouseMove, onMouseUp: this.props.onMouseUp, onMouseLeave: this.props.onMouseLeave, onTouchStart: this.doTouchStart, onTouchMove: this.doTouchMove, onTouchEnd: this.props.onTouchEnd, onTouchCancel: this.props.onTouchCancel },
            react_1.default.createElement("div", { className: "timeLine-main-data-container", style: { height: height, width: Const_1.DATA_CONTAINER_WIDTH, maxWidth: Const_1.DATA_CONTAINER_WIDTH } }, this.renderRows())));
    };
    return DataViewPort;
}(react_1.Component));
exports.DataViewPort = DataViewPort;
exports.default = sizeMe({ monitorWidth: true, monitorHeight: true })(DataViewPort);
