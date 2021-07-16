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
var prop_types_1 = __importDefault(require("prop-types"));
var VerticalSpliter_1 = __importDefault(require("./components/taskList/VerticalSpliter"));
var Headers_1 = __importDefault(require("./components/header/Headers"));
var DataViewPort_1 = __importDefault(require("./components/viewport/DataViewPort"));
var LinkViewPort_1 = __importDefault(require("./components/links/LinkViewPort"));
var TaskList_1 = __importDefault(require("./components/taskList/TaskList"));
var Registry_1 = __importDefault(require("./helpers/registry/Registry"));
var Const_1 = require("./Const");
var Const_2 = require("./Const");
var Const_3 = require("./Const");
var DataController_1 = __importDefault(require("./controller/DataController"));
var Config_1 = __importDefault(require("./helpers/config/Config"));
require("./TimeLine.css");
var TimeLine = /** @class */ (function (_super) {
    __extends(TimeLine, _super);
    function TimeLine(props) {
        var _this = _super.call(this, props) || this;
        ////////////////////
        //     ON SIZE    //
        ////////////////////
        _this.onSize = function (size) {
            //If size has changed
            _this.calculateVerticalScrollVariables(size);
            if (!_this.initialise) {
                _this.dc.initialise(_this.state.scrollLeft + _this.state.nowposition, _this.state.scrollLeft + _this.state.nowposition + size.width, _this.state.nowposition, _this.state.dayWidth);
                _this.initialise = true;
            }
            _this.setStartEnd();
            var newNumVisibleRows = Math.ceil(size.height / _this.props.itemheight);
            var newNumVisibleDays = _this.calcNumVisibleDays(size);
            var rowInfo = _this.calculateStartEndRows(newNumVisibleRows, _this.props.data, _this.state.scrollTop);
            _this.setState({
                numVisibleRows: newNumVisibleRows,
                numVisibleDays: newNumVisibleDays,
                startRow: rowInfo.start,
                endRow: rowInfo.end,
                size: size
            });
        };
        /////////////////////////
        //   VIEWPORT CHANGES  //
        /////////////////////////
        _this.verticalChange = function (scrollTop) {
            if (scrollTop == _this.state.scrollTop)
                return;
            //Check if we have scrolling rows
            var rowInfo = _this.calculateStartEndRows(_this.state.numVisibleRows, _this.props.data, scrollTop);
            if (rowInfo.start !== _this.state.start) {
                _this.setState({
                    scrollTop: scrollTop,
                    startRow: rowInfo.start,
                    endRow: rowInfo.end
                });
            }
        };
        _this.calculateStartEndRows = function (numVisibleRows, data, scrollTop) {
            var new_start = Math.trunc(scrollTop / _this.props.itemheight);
            var new_end = new_start + numVisibleRows >= data.length ? data.length : new_start + numVisibleRows;
            return { start: new_start, end: new_end };
        };
        _this.setStartEnd = function () {
            _this.dc.setStartEnd(_this.state.scrollLeft, _this.state.scrollLeft + _this.state.size.width, _this.state.nowposition, _this.state.dayWidth);
        };
        _this.horizontalChange = function (newScrollLeft) {
            var new_nowposition = _this.state.nowposition;
            var new_left = -1;
            var headerData = _this.state.headerData;
            var new_startRow = _this.state.startRow;
            var new_endRow = _this.state.endRow;
            //Calculating if we need to roll up the scroll
            if (newScrollLeft > _this.pxToScroll) {
                //ContenLegnth-viewportLengt
                new_nowposition = _this.state.nowposition - _this.pxToScroll;
                new_left = 0;
            }
            else {
                if (newScrollLeft <= 0) {
                    //ContenLegnth-viewportLengt
                    new_nowposition = _this.state.nowposition + _this.pxToScroll;
                    new_left = _this.pxToScroll;
                }
                else {
                    new_left = newScrollLeft;
                }
            }
            //Get the day of the left position
            var currentIndx = Math.trunc((newScrollLeft - _this.state.nowposition) / _this.state.dayWidth);
            //Calculate rows to render
            new_startRow = Math.trunc(_this.state.scrollTop / _this.props.itemheight);
            new_endRow =
                new_startRow + _this.state.numVisibleRows >= _this.props.data.length
                    ? _this.props.data.length - 1
                    : new_startRow + _this.state.numVisibleRows;
            //If we need updates then change the state and the scroll position
            //Got you
            _this.setStartEnd();
            _this.setState({
                currentday: currentIndx,
                nowposition: new_nowposition,
                headerData: headerData,
                scrollLeft: new_left,
                startRow: new_startRow,
                endRow: new_endRow
            });
        };
        _this.calculateVerticalScrollVariables = function (size) {
            //The pixel to scroll verically is equal to the pecentage of what the viewport represent in the context multiply by the context width
            _this.pxToScroll = (1 - size.width / Const_1.DATA_CONTAINER_WIDTH) * Const_1.DATA_CONTAINER_WIDTH - 1;
        };
        _this.onHorizonChange = function (lowerLimit, upLimit) {
            if (_this.props.onHorizonChange)
                _this.props.onHorizonChange(lowerLimit, upLimit);
        };
        /////////////////////
        //   MOUSE EVENTS  //
        /////////////////////
        _this.doMouseDown = function (e) {
            _this.dragging = true;
            _this.draggingPosition = e.clientX;
        };
        _this.doMouseMove = function (e) {
            if (_this.dragging) {
                var delta = _this.draggingPosition - e.clientX;
                if (delta !== 0) {
                    _this.draggingPosition = e.clientX;
                    _this.horizontalChange(_this.state.scrollLeft + delta);
                }
            }
        };
        _this.doMouseUp = function (e) {
            _this.dragging = false;
        };
        _this.doMouseLeave = function (e) {
            // if (!e.relatedTarget.nodeName)
            //     this.dragging=false;
            _this.dragging = false;
        };
        _this.doTouchStart = function (e) {
            _this.dragging = true;
            _this.draggingPosition = e.touches[0].clientX;
        };
        _this.doTouchEnd = function (e) {
            _this.dragging = false;
        };
        _this.doTouchMove = function (e) {
            if (_this.dragging) {
                var delta = _this.draggingPosition - e.touches[0].clientX;
                if (delta !== 0) {
                    _this.draggingPosition = e.touches[0].clientX;
                    _this.horizontalChange(_this.state.scrollLeft + delta);
                }
            }
        };
        _this.doTouchCancel = function (e) {
            _this.dragging = false;
        };
        //Child communicating states
        _this.onTaskListSizing = function (delta) {
            _this.setState(function (prevState) {
                var result = __assign({}, prevState);
                result.sideStyle = { width: result.sideStyle.width - delta };
                return result;
            });
        };
        /////////////////////
        //   ITEMS EVENTS  //
        /////////////////////
        _this.onSelectItem = function (item) {
            if (_this.props.onSelectItem && item != _this.props.selectedItem)
                _this.props.onSelectItem(item);
        };
        _this.onStartCreateLink = function (task, position) {
            console.log("Start Link " + task);
            _this.setState({
                interactiveMode: true,
                taskToCreate: { task: task, position: position }
            });
        };
        _this.onFinishCreateLink = function (task, position) {
            console.log("End Link " + task);
            if (_this.props.onCreateLink && task &&
                _this.state.taskToCreate && _this.state.taskToCreate.task.id != task.id) {
                _this.props.onCreateLink({
                    start: _this.state.taskToCreate,
                    end: { task: task, position: position }
                });
            }
            _this.setState({
                interactiveMode: false,
                taskToCreate: null
            });
        };
        _this.onTaskChanging = function (changingTask) {
            _this.setState({
                changingTask: changingTask
            });
        };
        _this.calcNumVisibleDays = function (size) {
            return Math.ceil(size.width / _this.state.dayWidth) + Const_1.BUFFER_DAYS;
        };
        _this.checkNeeeData = function () {
            if (_this.props.data != _this.state.data) {
                var rowInfo = _this.calculateStartEndRows(_this.state.numVisibleRows, _this.props.data, _this.state.scrollTop);
                Registry_1.default.registerData(_this.state.data);
                _this.setState({
                    data: _this.props.data,
                    startRow: rowInfo.start,
                    endRow: rowInfo.end
                });
            }
            if (_this.props.links != _this.state.links) {
                _this.setState({ links: _this.props.links });
                Registry_1.default.registerLinks(_this.props.links);
            }
        };
        _this.dragging = false;
        _this.draggingPosition = 0;
        _this.dc = new DataController_1.default();
        _this.dc.onHorizonChange = _this.onHorizonChange;
        _this.initialise = false;
        //This variable define the number of pixels the viewport can scroll till arrive to the end of the context
        _this.pxToScroll = 1900;
        var dayWidth = _this.getDayWidth(_this.props.mode);
        Config_1.default.load(_this.props.config);
        //Initialising state
        _this.state = {
            currentday: 0,
            //nowposition is the reference position, this variable support the infinit scrolling by accumulatning scroll times and redefining the 0 position
            // if we accumulat 2 scroll to the left nowposition will be 2* DATA_CONTAINER_WIDTH
            nowposition: 0,
            startRow: 0,
            endRow: 10,
            sideStyle: { width: 200 },
            scrollLeft: 0,
            scrollTop: 0,
            numVisibleRows: 40,
            numVisibleDays: 60,
            dayWidth: dayWidth,
            interactiveMode: false,
            taskToCreate: null,
            links: [],
            mode: _this.props.mode ? _this.props.mode : Const_2.VIEW_MODE_MONTH,
            size: { width: 1, height: 1 },
            changingTask: null
        };
        return _this;
    }
    ////////////////////
    //     ON MODE    //
    ////////////////////
    TimeLine.prototype.getDayWidth = function (mode) {
        switch (mode) {
            case Const_2.VIEW_MODE_DAY:
                return Const_3.DAY_DAY_MODE;
            case Const_2.VIEW_MODE_WEEK:
                return Const_3.DAY_WEEK_MODE;
            case Const_2.VIEW_MODE_MONTH:
                return Const_3.DAY_MONTH_MODE;
            case Const_2.VIEW_MODE_YEAR:
                return Const_3.DAY_YEAR_MODE;
            default:
                return Const_3.DAY_MONTH_MODE;
        }
    };
    TimeLine.prototype.checkMode = function () {
        if (this.props.mode != this.state.mode && this.props.mode) {
            var newDayWidth = this.getDayWidth(this.state.mode);
            //to recalculate the now position we have to see how mwny scroll has happen
            //to do so we calculate the diff of days between current day and now
            //And we calculate how many times we have scroll
            var scrollTime = Math.ceil((-this.state.currentday * this.state.dayWidth) / this.pxToScroll);
            //We readjust now postion to the new number of scrolls
            var scrollLeft = (this.state.currentday * this.state.dayWidth + this.state.nowposition) % this.pxToScroll;
            // we recalculate the new scroll Left value
            this.setState({
                mode: this.props.mode,
                dayWidth: newDayWidth,
                numVisibleDays: this.calcNumVisibleDays(this.state.size),
                nowposition: scrollTime * this.pxToScroll,
                scrollLeft: scrollLeft
            });
        }
    };
    TimeLine.prototype.render = function () {
        this.checkMode();
        this.checkNeeeData();
        console.log('On render');
        if (!this.state.size) {
            console.log(this.state);
        }
        return (react_1.default.createElement("div", { className: "timeLine" },
            react_1.default.createElement("div", { className: "timeLine-side-main", style: this.state.sideStyle },
                react_1.default.createElement(TaskList_1.default, { ref: "taskViewPort", itemheight: this.props.itemheight, startRow: this.state.startRow, endRow: this.state.endRow, data: this.props.data, selectedItem: this.props.selectedItem, onSelectItem: this.onSelectItem, onUpdateTask: this.props.onUpdateTask, onScroll: this.verticalChange, nonEditable: this.props.nonEditableName }),
                react_1.default.createElement(VerticalSpliter_1.default, { onTaskListSizing: this.onTaskListSizing })),
            react_1.default.createElement("div", { className: "timeLine-main" },
                react_1.default.createElement(Headers_1.default, { headerData: this.state.headerData, numVisibleDays: this.state.numVisibleDays, currentday: this.state.currentday, nowposition: this.state.nowposition, dayWidth: this.state.dayWidth, mode: this.state.mode, scrollLeft: this.state.scrollLeft }),
                react_1.default.createElement(DataViewPort_1.default, { ref: "dataViewPort", scrollLeft: this.state.scrollLeft, scrollTop: this.state.scrollTop, itemheight: this.props.itemheight, nowposition: this.state.nowposition, startRow: this.state.startRow, endRow: this.state.endRow, data: this.props.data, selectedItem: this.props.selectedItem, dayWidth: this.state.dayWidth, onScroll: this.scrollData, onMouseDown: this.doMouseDown, onMouseMove: this.doMouseMove, onMouseUp: this.doMouseUp, onMouseLeave: this.doMouseLeave, onTouchStart: this.doTouchStart, onTouchMove: this.doTouchMove, onTouchEnd: this.doTouchEnd, onTouchCancel: this.doTouchCancel, onSelectItem: this.onSelectItem, onUpdateTask: this.props.onUpdateTask, onTaskChanging: this.onTaskChanging, onStartCreateLink: this.onStartCreateLink, onFinishCreateLink: this.onFinishCreateLink, boundaries: {
                        lower: this.state.scrollLeft,
                        upper: this.state.scrollLeft + this.state.size.width
                    }, onSize: this.onSize }),
                react_1.default.createElement(LinkViewPort_1.default, { scrollLeft: this.state.scrollLeft, scrollTop: this.state.scrollTop, startRow: this.state.startRow, endRow: this.state.endRow, data: this.props.data, nowposition: this.state.nowposition, dayWidth: this.state.dayWidth, interactiveMode: this.state.interactiveMode, taskToCreate: this.state.taskToCreate, onFinishCreateLink: this.onFinishCreateLink, changingTask: this.state.changingTask, selectedItem: this.props.selectedItem, onSelectItem: this.onSelectItem, itemheight: this.props.itemheight, links: this.props.links }))));
    };
    return TimeLine;
}(react_1.Component));
TimeLine.propTypes = {
    itemheight: prop_types_1.default.number.isRequired,
    dayWidth: prop_types_1.default.number.isRequired,
    nonEditableName: prop_types_1.default.bool
};
TimeLine.defaultProps = {
    itemheight: 20,
    dayWidth: 24,
    nonEditableName: false
};
exports.default = TimeLine;
