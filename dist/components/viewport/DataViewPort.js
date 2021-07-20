"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
exports.DataViewPort = exports.BaseDataViewPort = void 0;
var react_1 = __importStar(require("react"));
var Const_1 = require("../../Const");
var DataTask_1 = __importDefault(require("./DataTask"));
var DataRow_1 = __importDefault(require("./DataRow"));
var DateHelper_1 = __importDefault(require("../../helpers/DateHelper"));
var react_2 = require("react");
var utils_1 = require("../../utils");
var context_1 = require("../../context");
var styled_components_1 = __importDefault(require("styled-components"));
var react_resize_aware_1 = __importDefault(require("react-resize-aware"));
var BaseDataViewPort = function (props) {
    var _a;
    var dataViewRef = react_1.useRef(null);
    var _b = react_2.useContext(context_1.TimelineContext), mode = _b.mode, style = _b.style, dayWidth = _b.dayWidth, moveTimeline = _b.moveTimeline, scrollLeft = _b.scrollLeft;
    var _c = react_1.useState(false), childDragging = _c[0], setChildDragging = _c[1];
    var reporter = function (target) {
        var _a;
        var dimensions = { width: (target === null || target === void 0 ? void 0 : target.clientWidth) || null, height: (target === null || target === void 0 ? void 0 : target.clientHeight) || null };
        if (dimensions.width && dimensions.height)
            (_a = props.onSize) === null || _a === void 0 ? void 0 : _a.call(props, dimensions);
        return dimensions;
    };
    var _d = react_resize_aware_1.default(reporter), resizeListener = _d[0], sizes = _d[1];
    var getContainerHeight = function (rows) {
        var new_height = rows > 0 ? rows * props.itemheight : 10;
        return new_height;
    };
    var onChildDrag = function (dragging) {
        setChildDragging(dragging);
    };
    var renderRows = function () {
        var result = [];
        for (var i = props.startRow; i < props.endRow + 1; i++) {
            var item = props.data[i];
            if (!item)
                break;
            //FIXME PAINT IN BOUNDARIES
            var new_position = DateHelper_1.default.dateToPixel(item.start, props.nowposition, dayWidth || 0);
            var new_width = DateHelper_1.default.dateToPixel(item.end, props.nowposition, dayWidth || 0) - new_position;
            result.push(react_1.default.createElement(DataRow_1.default, { isSelected: props.selectedItem == item, key: i, label: item.name, top: i * (props.itemheight + 5), left: 20, itemheight: (props.itemheight + 5) },
                react_1.default.createElement(DataTask_1.default, { item: item, label: item.name, nowposition: props.nowposition, dayWidth: dayWidth, color: item.color, left: new_position, width: new_width, height: props.itemheight, onChildDrag: onChildDrag, isSelected: props.selectedItem == item, onSelectItem: props.onSelectItem, onStartCreateLink: props.onStartCreateLink, onFinishCreateLink: props.onFinishCreateLink, onTaskChanging: props.onTaskChanging, onUpdateTask: props.onUpdateTask }, ' ')));
        }
        return result;
    };
    var doMouseDown = function (e) {
        if (e.button === 0 && !childDragging) {
            props.onMouseDown(e);
        }
    };
    var doMouseMove = function (e) {
        props.onMouseMove(e, dataViewRef.current);
    };
    var doTouchStart = function (e) {
        if (!childDragging) {
            props.onTouchStart(e);
        }
    };
    var doTouchMove = function (e) {
        props.onTouchMove(e, dataViewRef.current);
    };
    react_1.useEffect(function () {
        if (dataViewRef.current)
            dataViewRef.current.scrollLeft = 0;
    }, []);
    react_1.useEffect(function () {
        if (dataViewRef.current) {
            dataViewRef.current.scrollLeft = props.scrollLeft;
            dataViewRef.current.scrollTop = props.scrollTop;
        }
    }, [props.scrollLeft, props.scrollTop]);
    var backgroundStyle = (mode && (style === null || style === void 0 ? void 0 : style.background)) ? (_a = style === null || style === void 0 ? void 0 : style.background) === null || _a === void 0 ? void 0 : _a.call(style, mode, dayWidth || 0) : {
        background: "linear-gradient(\n      to right,\n      #5d9634,\n      #5d9634 50%,\n      #538c2b 50%,\n      #538c2b\n    )",
        backgroundSize: (utils_1.getBackgroundWidth(props.mode || 'month') * (dayWidth || 0)) * 2 + "px 100%",
        backgroundPositionX: utils_1.getBackgroundPosition(props.mode || 'month'),
    };
    var height = getContainerHeight(props.data.length);
    return (react_1.default.createElement("div", { ref: dataViewRef, id: "timeLinedataViewPort", className: props.className + " timeLine-main-data-viewPort", onWheel: function (evt) {
            //
            moveTimeline === null || moveTimeline === void 0 ? void 0 : moveTimeline((scrollLeft || 0) + evt.deltaX);
        }, onMouseDown: doMouseDown, onMouseMove: doMouseMove, onMouseUp: props.onMouseUp, onMouseLeave: props.onMouseLeave, onTouchStart: doTouchStart, onTouchMove: doTouchMove, onTouchEnd: props.onTouchEnd, onTouchCancel: props.onTouchCancel },
        resizeListener,
        react_1.default.createElement("div", { className: "timeLine-main-data-container", style: {
                background: 'transparent',
                height: '100%',
                width: Const_1.DATA_CONTAINER_WIDTH,
                maxWidth: Const_1.DATA_CONTAINER_WIDTH
            } }, renderRows())));
};
exports.BaseDataViewPort = BaseDataViewPort;
exports.DataViewPort = styled_components_1.default(exports.BaseDataViewPort)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n.timeLine-main-data-container{\n  background: ;\n  }\n\n"], ["\n.timeLine-main-data-container{\n  background: ;\n  }\n\n"])));
exports.default = exports.DataViewPort;
var templateObject_1;
//sizeMe({ monitorWidth: true, monitorHeight: true })(DataViewPort);
