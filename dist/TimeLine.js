"use strict";
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
exports.Timeline = void 0;
var react_1 = __importStar(require("react"));
var VerticalSpliter_1 = __importDefault(require("./components/taskList/VerticalSpliter"));
var Headers_1 = __importDefault(require("./components/header/Headers"));
var DataViewPort_1 = __importDefault(require("./components/viewport/DataViewPort"));
var LinkViewPort_1 = __importDefault(require("./components/links/LinkViewPort"));
var TaskList_1 = __importDefault(require("./components/taskList/TaskList"));
var Const_1 = require("./Const");
var Const_2 = require("./Const");
var DataController_1 = __importDefault(require("./controller/DataController"));
var Config_1 = __importDefault(require("./helpers/config/Config"));
var context_1 = require("./context");
var nanoid_1 = require("nanoid");
var react_2 = require("react");
var react_3 = require("react");
var utils_1 = require("./utils");
var grommet_1 = require("grommet");
require("./TimeLine.css");
var Timeline = function (props) {
    var _a = react_2.useState(false), dragging = _a[0], setDragging = _a[1];
    var _b = react_2.useState(0), draggingPosition = _b[0], setDraggingPosition = _b[1];
    var _c = react_2.useState(24000), pxToScroll = _c[0], setPxToScroll = _c[1];
    var _d = react_2.useState(0), scrollTop = _d[0], setScrollTop = _d[1];
    var _e = react_2.useState(0), scrollLeft = _e[0], setScrollLeft = _e[1];
    var _f = react_2.useState(), startRow = _f[0], setStartRow = _f[1];
    var _g = react_2.useState(), endRow = _g[0], setEndRow = _g[1];
    var _h = react_2.useState(40), numVisibleRows = _h[0], setNumVisibleRows = _h[1];
    var _j = react_2.useState(60), numVisibleDays = _j[0], setNumVisibleDays = _j[1];
    var _k = react_2.useState(0), nowposition = _k[0], setNowPosition = _k[1];
    var _l = react_2.useState({ width: 200 }), sideStyle = _l[0], setSideStyle = _l[1];
    var dayWidth = react_3.useRef(utils_1.getDayWidth(props.mode || 'month'));
    var _m = react_2.useState(0), currentday = _m[0], setCurrentDay = _m[1];
    var _o = react_2.useState(false), interactiveMode = _o[0], setInteractiveMode = _o[1];
    var _p = react_2.useState(props.mode ? props.mode : Const_2.VIEW_MODE_MONTH), mode = _p[0], setMode = _p[1];
    var _q = react_2.useState({ width: 1, height: 1 }), size = _q[0], setSize = _q[1];
    var _r = react_2.useState(), taskToCreate = _r[0], setTaskToCreate = _r[1];
    var _s = react_2.useState(), changingTask = _s[0], setChangingTask = _s[1];
    var dc = react_3.useRef(new DataController_1.default());
    var _t = react_2.useState(), scrollData = _t[0], setScrollData = _t[1];
    var _u = react_2.useState(), headerData = _u[0], setHeaderData = _u[1];
    var _v = react_2.useState([]), data = _v[0], setData = _v[1];
    var _w = react_2.useState([]), links = _w[0], setLinks = _w[1];
    react_1.useEffect(function () {
        dc.current.onHorizonChange = onHorizonChange;
        Config_1.default.load(props.config);
        dc.current.initialise(scrollLeft + nowposition, scrollLeft + nowposition + size.width, nowposition, dayWidth.current);
    }, []);
    ////////////////////
    //     ON MODE    //
    ////////////////////
    ////////////////////
    //     ON SIZE    //
    ////////////////////
    var onSize = function (size) {
        //If size has changed
        console.log(size, dayWidth);
        calculateVerticalScrollVariables(size);
        // if (!initialise) {
        //   dc.current.initialise(
        //     scrollLeft + nowposition,
        //     scrollLeft + nowposition + size.width,
        //     nowposition,
        //     dayWidth
        //   );
        //   initialise = true;
        // }
        setStartEnd();
        var newNumVisibleRows = Math.ceil(size.height / (props.itemheight || 0));
        var newNumVisibleDays = calcNumVisibleDays(size, dayWidth.current);
        var rowInfo = calculateStartEndRows(newNumVisibleRows, props.data || [], scrollTop);
        setNumVisibleDays(newNumVisibleDays);
        console.log("DAYS", newNumVisibleDays);
        setNumVisibleRows(newNumVisibleRows);
        setStartRow(rowInfo.start);
        setEndRow(rowInfo.end);
        setSize(size);
    };
    /////////////////////////
    //   VIEWPORT CHANGES  //
    /////////////////////////
    var verticalChange = function (scrollTop) {
        if (scrollTop == scrollTop)
            return;
        //Check if we have scrolling rows
        var rowInfo = calculateStartEndRows(numVisibleRows, props.data || [], scrollTop);
        if (rowInfo.start !== startRow) {
            setScrollTop(scrollTop);
            setStartRow(rowInfo.start);
            setEndRow(rowInfo.end);
        }
    };
    var calculateStartEndRows = function (numVisibleRows, data, scrollTop) {
        var new_start = Math.trunc(scrollTop / (props.itemheight || 0));
        var new_end = new_start + numVisibleRows >= data.length ? data.length : new_start + numVisibleRows;
        return { start: new_start, end: new_end };
    };
    var setStartEnd = function () {
        dc.current.setStartEnd(scrollLeft, scrollLeft + size.width, nowposition, dayWidth.current);
    };
    var horizontalChange = function (newScrollLeft) {
        var _a, _b;
        var new_nowposition = nowposition;
        var new_left = -1;
        var new_startRow = startRow;
        var new_endRow = endRow;
        //Calculating if we need to roll up the scroll
        if (newScrollLeft > pxToScroll) {
            //ContenLegnth-viewportLengt
            new_nowposition = nowposition - pxToScroll - 0; //((props.mode == 'month' || props.mode == 'week') ? 8 : 0)//- 1; //+
            new_left = 0;
        }
        else {
            if (newScrollLeft <= 0) {
                //ContenLegnth-viewportLengt
                new_nowposition = nowposition + pxToScroll + 14; //((props.mode == 'month' || props.mode == 'week') ? 8 : 0) //; //-
                new_left = pxToScroll;
            }
            else {
                new_left = newScrollLeft;
            }
        }
        //Get the day of the left position
        var currentIndx = Math.trunc((newScrollLeft - nowposition) / dayWidth.current);
        //Calculate rows to render
        new_startRow = Math.trunc(scrollTop / (props.itemheight || 0));
        new_endRow =
            new_startRow + numVisibleRows >= (props.data || []).length
                ? (props.data || []).length - 1
                : new_startRow + numVisibleRows;
        //If we need updates then change the state and the scroll position
        //Got you
        setStartEnd();
        setCurrentDay(currentIndx);
        var date = new Date();
        var currentDate = props.date;
        date.setHours(0, 0, 0, 0);
        currentDate === null || currentDate === void 0 ? void 0 : currentDate.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + currentIndx);
        if (((_a = props.date) === null || _a === void 0 ? void 0 : _a.getTime()) != date.getTime()) {
            (_b = props.onDateChange) === null || _b === void 0 ? void 0 : _b.call(props, date);
        }
        setNowPosition(new_nowposition);
        setHeaderData(headerData);
        setScrollLeft(new_left);
        setStartRow(new_startRow);
        setEndRow(new_endRow);
    };
    var calculateVerticalScrollVariables = function (size) {
        //The pixel to scroll verically is equal to the pecentage of what the viewport represent in the context multiply by the context width
        setPxToScroll((1 - size.width / Const_1.DATA_CONTAINER_WIDTH) * Const_1.DATA_CONTAINER_WIDTH - 1);
    };
    var onHorizonChange = function (lowerLimit, upLimit) {
        if (props.onHorizonChange)
            props.onHorizonChange(lowerLimit, upLimit);
    };
    /////////////////////
    //   MOUSE EVENTS  //
    /////////////////////
    var doMouseDown = function (e) {
        setDragging(true);
        setDraggingPosition(e.clientX);
    };
    var doMouseMove = function (e) {
        if (dragging) {
            var delta = draggingPosition - e.clientX;
            if (delta !== 0) {
                setDraggingPosition(e.clientX);
                horizontalChange(scrollLeft + delta);
            }
        }
    };
    var doMouseUp = function (e) {
        setDragging(false);
    };
    var doMouseLeave = function (e) {
        // if (!e.relatedTarget.nodeName)
        //     dragging=false;
        setDragging(false);
    };
    var doTouchStart = function (e) {
        setDragging(true);
        setDraggingPosition(e.touches[0].clientX);
    };
    var doTouchEnd = function (e) {
        setDragging(false);
    };
    var doTouchMove = function (e) {
        if (dragging) {
            var delta = draggingPosition - e.touches[0].clientX;
            if (delta !== 0) {
                setDraggingPosition(e.touches[0].clientX);
                horizontalChange(scrollLeft + delta);
            }
        }
    };
    var doTouchCancel = function (e) {
        setDragging(false);
    };
    //Child communicating states
    var onTaskListSizing = function (delta) {
        setSideStyle({ width: delta });
        //sideStyle.width - delta 
    };
    /////////////////////
    //   ITEMS EVENTS  //
    /////////////////////
    var onSelectItem = function (item) {
        if (props.onSelectItem && item != props.selectedItem)
            props.onSelectItem(item);
    };
    var onStartCreateLink = function (task, position) {
        console.log("=> Start Link", task, position);
        setInteractiveMode(true);
        setTaskToCreate({ task: task, position: position });
    };
    var onFinishCreateLink = function (task, position) {
        console.log("End Link", task, taskToCreate, props.onCreateLink);
        if (props.onCreateLink && task &&
            taskToCreate && taskToCreate.task.id != task.id) {
            var newLink = {
                id: nanoid_1.nanoid(),
                source: taskToCreate.task.id,
                sourceHandle: taskToCreate.position,
                target: task.id,
                targetHandle: position
            };
            console.log("New link", newLink);
            props.onCreateLink(newLink);
        }
        setInteractiveMode(false);
        setTaskToCreate(undefined);
    };
    var onTaskChanging = function (changingTask) {
        console.log("Changing task", changingTask);
        setChangingTask(changingTask);
    };
    var calcNumVisibleDays = function (size, newDayWidth) {
        console.log(size, (newDayWidth || dayWidth));
        return Math.ceil(size.width / (newDayWidth || dayWidth.current)) + Const_1.BUFFER_DAYS;
    };
    var changeMode = function (newMode) {
        console.log("Change mode", newMode);
        if (newMode != mode) {
            var newDayWidth = utils_1.getDayWidth(newMode);
            //to recalculate the now position we have to see how mwny scroll has happen
            //to do so we calculate the diff of days between current day and now
            //And we calculate how many times we have scroll
            //Posible bug here now
            var scrollTime = Math.ceil((-currentday * newDayWidth) / pxToScroll);
            //We readjust now postion to the new number of scrolls
            var scrollLeft_1 = (currentday * newDayWidth + nowposition) % pxToScroll;
            // we recalculate the new scroll Left value
            console.log(newMode, newDayWidth);
            setMode(newMode);
            dayWidth.current = newDayWidth;
            setNumVisibleDays(calcNumVisibleDays(size, newDayWidth));
            setNowPosition(scrollTime * pxToScroll);
            setScrollLeft(scrollLeft_1);
        }
    };
    //USEFUL
    // let rowInfo = calculateStartEndRows(numVisibleRows, props.data || [], scrollTop);
    // const checkNeedData = () => {
    //   if (props.data != data) {
    //     Registry.registerData(data);
    //     setData(props.data || [])
    //     setStartRow(rowInfo.start)
    //     setEndRow(rowInfo.end)
    //   }
    //   if (props.links != links) {
    //     setLinks(props.links || [])
    //     Registry.registerLinks(props.links);
    //   }
    // };
    react_1.useEffect(function () {
        if (props.data) {
            setData(props.data);
        }
    }, [props.data]);
    react_1.useEffect(function () {
        if (props.links) {
            setLinks(props.links);
        }
    }, [props.links]);
    react_1.useEffect(function () {
        if (props.mode) {
            changeMode(props.mode);
        }
    }, [props.mode]);
    /*  checkMode();
      checkNeeeData();
      console.log('On render')
      if(!size){
        console.log(state)
      }*/
    console.log(data);
    return (react_1.default.createElement(context_1.TimelineContext.Provider, { value: {
            data: data,
            links: links,
            style: props.style,
            mode: mode,
            scrollLeft: scrollLeft,
            moveTimeline: horizontalChange,
            changeMode: changeMode,
            dayWidth: dayWidth.current
        } },
        react_1.default.createElement("div", { className: "timeLine", style: { position: 'relative', flex: 1 } },
            react_1.default.createElement("div", { className: "timeLine-side-main", style: sideStyle },
                react_1.default.createElement(TaskList_1.default, { itemheight: props.itemheight, startRow: startRow, endRow: endRow, data: props.data, selectedItem: props.selectedItem, onSelectItem: onSelectItem, onUpdateTask: props.onUpdateTask, onScroll: verticalChange, nonEditable: props.nonEditableName }),
                react_1.default.createElement(VerticalSpliter_1.default, { onTaskListSizing: onTaskListSizing })),
            react_1.default.createElement("div", { className: "timeLine-main" },
                react_1.default.createElement(grommet_1.Box, { style: { position: 'absolute', height: '100%', width: '100%', top: 0, left: 0 }, className: "header-container" },
                    react_1.default.createElement(Headers_1.default, { headerData: headerData, numVisibleDays: numVisibleDays, currentday: currentday, nowposition: nowposition, scrollLeft: scrollLeft })),
                react_1.default.createElement(grommet_1.Box, { style: { position: 'absolute', width: '100%', height: 'calc(100% - 60px)', zIndex: 9, top: 60, left: 0 } },
                    react_1.default.createElement(DataViewPort_1.default, { scrollLeft: scrollLeft, scrollTop: scrollTop, itemheight: props.itemheight, nowposition: nowposition, startRow: startRow, endRow: endRow, data: props.data, selectedItem: props.selectedItem, onScroll: scrollData, onMouseDown: doMouseDown, onMouseMove: doMouseMove, onMouseUp: doMouseUp, onMouseLeave: doMouseLeave, onTouchStart: doTouchStart, onTouchMove: doTouchMove, onTouchEnd: doTouchEnd, onTouchCancel: doTouchCancel, onSelectItem: onSelectItem, onUpdateTask: props.onUpdateTask, onTaskChanging: onTaskChanging, onStartCreateLink: onStartCreateLink, onFinishCreateLink: onFinishCreateLink, boundaries: {
                            lower: scrollLeft,
                            upper: scrollLeft + size.width
                        }, onSize: onSize }),
                    react_1.default.createElement(LinkViewPort_1.default, { scrollLeft: scrollLeft, scrollTop: scrollTop, startRow: startRow, endRow: endRow, data: props.data || [], nowposition: nowposition, interactiveMode: interactiveMode, taskToCreate: taskToCreate, onFinishCreateLink: onFinishCreateLink, changingTask: changingTask, selectedItem: props.selectedItem, onSelectItem: onSelectItem, itemheight: props.itemheight, links: props.links || [] }))))));
};
exports.Timeline = Timeline;
