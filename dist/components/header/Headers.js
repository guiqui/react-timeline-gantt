"use strict";
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
var moment_1 = __importDefault(require("moment"));
var Const_1 = require("../../Const");
var Const_2 = require("../../Const");
var Config_1 = __importDefault(require("../../helpers/config/Config"));
var DateHelper_1 = __importDefault(require("../../helpers/DateHelper"));
require("./Header.css");
var HeaderItem_1 = require("./HeaderItem");
var context_1 = require("../../context");
var BackgroundStripe_1 = require("./BackgroundStripe");
var Header = function (props) {
    var headerRef = react_1.useRef(null);
    var _a = react_1.useContext(context_1.TimelineContext), mode = _a.mode, dayWidth = _a.dayWidth;
    var getFormat = function (mode, position) {
        switch (mode) {
            case 'year':
                return 'YYYY';
            case 'month':
                if (position == 'top')
                    return 'MMMM YYYY';
                else
                    return 'MMMM';
            case 'week':
                if (position == 'top')
                    return 'ww MMMM YYYY';
                else
                    return 'ww';
            case 'dayweek':
                return 'dd';
            case 'daymonth':
                return 'D';
        }
    };
    var getModeIncrement = function (date, mode) {
        switch (mode) {
            case 'year':
                return DateHelper_1.default.daysInYear(date.year());
            case 'month':
                return date.daysInMonth();
            case 'week':
                return 7;
            default:
                return 1;
        }
    };
    //TODO mode
    var getStartDate = function (date, mode) {
        var year = null;
        switch (mode) {
            case 'year':
                year = date.year();
                return moment_1.default([year, 0, 1]);
            case 'month':
                year = date.year();
                var month = date.month();
                return moment_1.default([year, month, 1]);
            case 'week':
                return date.clone().startOf('week');
            default:
                return date;
        }
    };
    //TODO change mode type to timeline mode (also make timeline mode dynamic)
    var renderTime = function (left, width, mode, key) {
        var result = [];
        var hourWidth = width / 24;
        var iterLeft = 0;
        for (var i = 0; i < 24; i++) {
            result.push(react_1.default.createElement(HeaderItem_1.HeaderItem, { key: i, left: iterLeft, width: hourWidth, label: mode == 'shorttime' ? i : i + ":00" }));
            iterLeft = iterLeft + hourWidth;
        }
        return (react_1.default.createElement("div", { key: key, style: { position: 'absolute', height: 20, left: left, width: width } },
            ' ',
            result));
    };
    //TODO make mode timelinemode
    var getBox = function (date, mode, lastLeft) {
        if (lastLeft === void 0) { lastLeft = 0; }
        var increment = getModeIncrement(date, mode) * (dayWidth || 0);
        if (!lastLeft) {
            var starDate = getStartDate(date, mode);
            starDate = starDate.startOf('day');
            var now = moment_1.default().startOf('day');
            var daysInBetween = starDate.diff(now, 'days');
            lastLeft = DateHelper_1.default.dayToPosition(daysInBetween, (props.nowposition || 0), (dayWidth || 0));
        }
        return { left: lastLeft, width: increment };
    };
    //TODO change type to enum of options
    var renderHeaderRows = function (top, middle, bottom) {
        var result = { top: [], middle: [], bottom: [], background: [] };
        var lastLeft = {};
        var currentTop = '';
        var currentMiddle = '';
        var currentBottom = '';
        var currentDate = null;
        var box = null;
        var start = props.currentday;
        var end = (props.currentday || 0) + (props.numVisibleDays || 0);
        var _loop_1 = function (i) {
            //The unit of iteration is day
            currentDate = moment_1.default().add(i, 'days');
            if (currentTop != currentDate.format(getFormat(top, 'top'))) {
                currentTop = currentDate.format(getFormat(top, 'top'));
                box = getBox(currentDate, top, lastLeft.top);
                lastLeft.top = box.left + box.width;
                result.top.push(react_1.default.createElement(HeaderItem_1.HeaderItem, { key: i, left: box.left, width: box.width, label: currentTop }));
            }
            if (currentMiddle != currentDate.format(getFormat(middle))) {
                currentMiddle = currentDate.format(getFormat(middle));
                box = getBox(currentDate, middle, lastLeft.middle);
                lastLeft.middle = box.left + box.width;
                result.middle.push(react_1.default.createElement(HeaderItem_1.HeaderItem, { key: i, left: box.left, width: box.width, label: currentMiddle }));
            }
            if (currentBottom != currentDate.format(getFormat(bottom))) {
                currentBottom = currentDate.format(getFormat(bottom));
                box = getBox(currentDate, bottom, lastLeft.bottom);
                lastLeft.bottom = box.left + box.width;
                if (bottom == 'shorttime' || bottom == 'fulltime') {
                    var stripes = Array.apply(null, Array(24)).map(function () { }).map(function (x, ix) { return (react_1.default.createElement(BackgroundStripe_1.BackgroundStripe, { key: "tile-" + i + "-" + ix, background: ix % 2 == 0 ? '#5d9634' : '#538c2b', left: box.left + ((box.width / 24) * ix), width: box.width / 24 })); });
                    result.background.push(stripes);
                    result.bottom.push(renderTime(box.left, box.width, bottom, i));
                }
                else {
                    result.background.push(react_1.default.createElement(BackgroundStripe_1.BackgroundStripe, { key: "tile-" + i, left: box.left, width: box.width, background: i % 2 == 0 ? '#5d9634' : '#538c2b' }));
                    result.bottom.push(react_1.default.createElement(HeaderItem_1.HeaderItem, { key: i, left: box.left, width: box.width, label: currentBottom }));
                }
            }
        };
        for (var i = (start || 0) - Const_1.BUFFER_DAYS; i < end + Const_1.BUFFER_DAYS; i++) {
            _loop_1(i);
        }
        return (react_1.default.createElement("div", { className: "timeLine-main-header-container", style: { width: Const_1.DATA_CONTAINER_WIDTH, maxWidth: Const_1.DATA_CONTAINER_WIDTH } },
            react_1.default.createElement("div", { className: "header-top", style: __assign({}, Config_1.default.values.header.top.style) }, result.top),
            react_1.default.createElement("div", { className: "header-middle", style: __assign({}, Config_1.default.values.header.middle.style) }, result.middle),
            react_1.default.createElement("div", { className: "header-bottom", style: __assign({}, Config_1.default.values.header.bottom.style) }, result.bottom),
            react_1.default.createElement("div", { className: "header-bottom", style: __assign({ height: '100%' }, Config_1.default.values.header.bottom.style) }, result.background)));
    };
    var renderHeader = function () {
        switch (mode || props.mode) {
            case Const_2.VIEW_MODE_DAY:
                return renderHeaderRows('week', 'dayweek', 'fulltime');
            case Const_2.VIEW_MODE_WEEK:
                return renderHeaderRows('month', 'week', 'dayweek');
            case Const_2.VIEW_MODE_MONTH:
                return renderHeaderRows('month', 'dayweek', 'daymonth');
            case Const_2.VIEW_MODE_YEAR:
                return renderHeaderRows('year', 'month', 'week');
        }
    };
    /*
    const setBoundaries = () => {
      this.start = this.props.currentday - BUFFER_DAYS;
      this.end = this.props.currentday + this.props.numVisibleDays + BUFFER_DAYS;
    };
  
    const needToRender = () => {
      return this.props.currentday < this.start || this.props.currentday + this.props.numVisibleDays > this.end;
    };*/
    if (headerRef.current)
        headerRef.current.scrollLeft = (props.scrollLeft || 0);
    //Check boundaries to see if wee need to recalcualte header
    // if (this.needToRender()|| !this.cache){
    //     this.cache=this.renderHeader();
    //     this.setBoundaries();
    // }
    return (react_1.default.createElement("div", { id: "timeline-header", ref: headerRef, className: "timeLine-main-header-viewPort" }, renderHeader()));
};
exports.default = Header;
