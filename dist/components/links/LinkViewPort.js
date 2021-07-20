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
var react_1 = __importStar(require("react"));
var CreateLink_1 = __importDefault(require("./CreateLink"));
var DateHelper_1 = __importDefault(require("../../helpers/DateHelper"));
var Link_1 = __importDefault(require("./Link"));
var context_1 = require("../../context");
var react_2 = require("react");
var useLinks_1 = require("../../hooks/useLinks");
var useData_1 = require("../../hooks/useData");
var LinkViewPort = function (props) {
    var _a, _b, _c, _d;
    var taskToCreate = useData_1.useDataItem(((_b = (_a = props.taskToCreate) === null || _a === void 0 ? void 0 : _a.task) === null || _b === void 0 ? void 0 : _b.id) || '');
    var link = useLinks_1.useLink((_d = (_c = props.taskToCreate) === null || _c === void 0 ? void 0 : _c.task) === null || _d === void 0 ? void 0 : _d.id);
    var links = useLinks_1.useLinks();
    var _e = react_1.useContext(context_1.TimelineContext), data = _e.data, dayWidth = _e.dayWidth;
    var _f = react_2.useState(null), selectedItem = _f[0], setSelectedItem = _f[1];
    var _g = react_2.useState(), changingTask = _g[0], setChangingTask = _g[1];
    var _h = react_2.useState([]), cache = _h[0], setCache = _h[1];
    var renderLink = function (startItem, endItem, link, key) {
        var startPosition = getItemPosition(startItem.index, startItem.end);
        var endPosition = getItemPosition(endItem.index, endItem.start);
        return (react_1.default.createElement(Link_1.default, { key: link.id, item: link, start: { x: startPosition.x, y: startPosition.y }, end: { x: endPosition.x, y: endPosition.y }, isSelected: props.selectedItem == link, onSelectItem: props.onSelectItem }));
    };
    var getItemPosition = function (index, date) {
        var itemHeight = (props.itemheight || 0) + 5;
        var x = DateHelper_1.default.dateToPixel(date, 0, dayWidth || 0);
        var y = (index * (itemHeight)) + (itemHeight / 2);
        return { x: x, y: y };
    };
    var renderLinks = function () {
        var ret = [];
        var startItem = {};
        var endItem = {};
        if ((data === null || data === void 0 ? void 0 : data.length) == 0)
            return;
        for (var i = 0; i < (links || []).length; i++) {
            var link_1 = links === null || links === void 0 ? void 0 : links[i];
            if (!link_1)
                return;
            // if (renderLinks[link.id]) continue;
            startItem = useData_1.useDataItem(link_1.source);
            if (!startItem) {
                //ret.concat([null])
                continue;
            }
            endItem = useData_1.useDataItem(link_1.target || '');
            if (!endItem) {
                //  setCache(cache.concat([null]))
                continue;
            }
            ret = ret.concat([renderLink(startItem, endItem, link_1, i)]);
            // renderLinks[link.id] = '';
        }
        return ret;
    };
    var renderCreateLink = function () {
        var _a;
        if (props.interactiveMode && ((_a = props.taskToCreate) === null || _a === void 0 ? void 0 : _a.task.id)) {
            if (!taskToCreate)
                return console.error("No link");
            var position = getItemPosition(taskToCreate === null || taskToCreate === void 0 ? void 0 : taskToCreate.index, taskToCreate === null || taskToCreate === void 0 ? void 0 : taskToCreate.end);
            return react_1.default.createElement(CreateLink_1.default, { start: position, onFinishCreateLink: props.onFinishCreateLink });
        }
    };
    // useEffect(() => {
    //   if(props.changingTask != changingTask){
    //     let view_links = [];
    //     const links = useTaskLinks(props.changingTask.id)
    //     let startPosition : any = {};
    //     let endPosition : any = {};
    //     for (let i = 0; i < links.length; i++) {
    //       let link = links[i];
    //       const startItem = useDataItem(link.source)
    //       //startItem = Registry.getTask(link.start);
    //       const endItem = useDataItem(link.target || '')
    //       //  endItem = Registry.getTask(item.link.end);
    //       if(!startItem?.end || !endItem?.end) return;
    //       startPosition = getItemPosition(startItem?.index ||0 , startItem?.end);
    //       if (changingTask.item.id == link.source) startPosition.x = changingTask.position.end;
    //       endPosition = getItemPosition(endItem?.index ||0, endItem?.start);
    //       if (changingTask.item.id == link.target) endPosition.x = changingTask.position.start;
    //   }
    // }, [props.changingTask])
    // const renderChangingTaskLinks = () => {
    //   let ret = [];
    //   if (props.changingTask != changingTask) {
    //     setChangingTask(props.changingTask)
    //     //Get Links from task
    //     const links = useTaskLinks(props.changingTask.id)
    //     if (!links) return;
    //     let item = null;
    //     //let startItem = null;
    //    // let endItem = null;
    //     let startPosition : any = {};
    //     let endPosition : any = {};
    //     for (let i = 0; i < links.length; i++) {
    //       let link = links[i];
    //       const startItem = useDataItem(link.source)
    //       //startItem = Registry.getTask(link.start);
    //       const endItem = useDataItem(link.target || '')
    //       //  endItem = Registry.getTask(item.link.end);
    //       if(!startItem?.end || !endItem?.end) return;
    //       startPosition = getItemPosition(startItem?.index ||0 , startItem?.end);
    //       if (changingTask.item.id == link.source) startPosition.x = changingTask.position.end;
    //       endPosition = getItemPosition(endItem?.index ||0, endItem?.start);
    //       if (changingTask.item.id == link.target) endPosition.x = changingTask.position.start;
    //       ret[link.index] = (
    //         <LinkComponent
    //           key={`link`}
    //           item={item}
    //           start={{ x: startPosition.x, y: startPosition.y }}
    //           end={{ x: endPosition.x, y: endPosition.y }}
    //           isSelected={props.selectedItem == item}
    //           onSelectItem={props.onSelectItem}
    //         />
    //       );
    //   }
    //   return ret;
    // }
    // useEffect(() => {
    //   renderChangingTaskLinks();
    // }, [props.changingTask])
    return (react_1.default.createElement("svg", { x: 0, y: 0, width: "100%", pointerEvents: "none", style: { position: 'absolute', top: 0, userSelect: 'none', height: '100%' } },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("marker", { id: "arrow", viewBox: "0 0 10 10", refX: "5", refY: "5", markerWidth: "9", markerHeight: "9", orient: "auto-start-reverse" },
                react_1.default.createElement("path", { d: "M 0 0 L 10 5 L 0 10 z", strokeLinejoin: "round" }))),
        react_1.default.createElement("g", { transform: "matrix(1,0,0,1," + -((props.scrollLeft || 0) - (props.nowposition || 0)) + "," + -(props.scrollTop || 0) + ")" },
            renderLinks(),
            renderCreateLink())));
};
exports.default = LinkViewPort;
