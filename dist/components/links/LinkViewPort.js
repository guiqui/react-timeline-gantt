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
var Registry_1 = __importDefault(require("../../helpers/registry/Registry"));
var CreateLink_1 = __importDefault(require("./CreateLink"));
var DateHelper_1 = __importDefault(require("../../helpers/DateHelper"));
var Link_1 = __importDefault(require("./Link"));
var context_1 = require("../../context");
var react_2 = require("react");
var LinkViewPort = function (props) {
    var _a = react_1.useContext(context_1.TimelineContext), links = _a.links, data = _a.data, dayWidth = _a.dayWidth;
    var _b = react_2.useState(null), selectedItem = _b[0], setSelectedItem = _b[1];
    var _c = react_2.useState(), changingTask = _c[0], setChangingTask = _c[1];
    var _d = react_2.useState([]), cache = _d[0], setCache = _d[1];
    var renderLink = function (startItem, endItem, link, key) {
        var startPosition = getItemPosition(startItem.index, startItem.item.end);
        var endPosition = getItemPosition(endItem.index, endItem.item.start);
        return (react_1.default.createElement(Link_1.default, { key: key, item: link, start: { x: startPosition.x, y: startPosition.y }, end: { x: endPosition.x, y: endPosition.y }, isSelected: props.selectedItem == link, onSelectItem: props.onSelectItem }));
    };
    var getItemPosition = function (index, date) {
        var x = DateHelper_1.default.dateToPixel(date, 0, dayWidth || 0);
        var y = index * (props.itemheight || 0) + (props.itemheight || 0) / 2;
        return { x: x, y: y };
    };
    var renderLinks = function () {
        setCache([]);
        var renderLinks = {};
        var startItem, endItem = {};
        if ((data === null || data === void 0 ? void 0 : data.length) == 0)
            return;
        for (var i = 0; i < (links || []).length; i++) {
            var link = links === null || links === void 0 ? void 0 : links[i];
            if (!link)
                return;
            if (renderLinks[link.id])
                continue;
            startItem = Registry_1.default.getTask(link.start);
            if (!startItem) {
                setCache(cache.concat([null]));
                continue;
            }
            endItem = Registry_1.default.getTask(link.end);
            if (!endItem) {
                setCache(cache.concat([null]));
                continue;
            }
            setCache(cache.concat(renderLinks(startItem, endItem, link, i)));
            renderLinks[link.id] = '';
        }
    };
    var renderCreateLink = function () {
        var _a, _b;
        if (props.interactiveMode) {
            var record = Registry_1.default.getTask((_b = (_a = props.taskToCreate) === null || _a === void 0 ? void 0 : _a.task) === null || _b === void 0 ? void 0 : _b.id);
            var position = getItemPosition(record === null || record === void 0 ? void 0 : record.index, record === null || record === void 0 ? void 0 : record.item.end);
            return react_1.default.createElement(CreateLink_1.default, { start: position, onFinishCreateLink: props.onFinishCreateLink });
        }
    };
    var renderChangingTaskLinks = function () {
        if (props.changingTask != changingTask) {
            setChangingTask(props.changingTask);
            //Get Links from task
            var links_1 = Registry_1.default.getLinks(props.changingTask.item.id);
            if (!links_1)
                return;
            var item = null;
            var startItem = null;
            var endItem = null;
            var startPosition = {};
            var endPosition = {};
            for (var i = 0; i < links_1.length; i++) {
                item = links_1[i];
                startItem = Registry_1.default.getTask(item.link.start);
                if (!startItem)
                    continue;
                endItem = Registry_1.default.getTask(item.link.end);
                if (!endItem)
                    continue;
                startPosition = getItemPosition(startItem.index, startItem.item.end);
                if (changingTask.item.id == item.link.start)
                    startPosition.x = changingTask.position.end;
                endPosition = getItemPosition(endItem.index, endItem.item.start);
                if (changingTask.item.id == item.link.end)
                    endPosition.x = changingTask.position.start;
                cache[item.index] = (react_1.default.createElement(Link_1.default, { key: -i - 1, item: item, start: { x: startPosition.x, y: startPosition.y }, end: { x: endPosition.x, y: endPosition.y }, isSelected: props.selectedItem == item, onSelectItem: props.onSelectItem }));
                setCache(cache);
            }
        }
    };
    react_1.useEffect(function () {
        renderChangingTaskLinks();
    }, [props.changingTask]);
    return (react_1.default.createElement("svg", { x: 0, y: 0, width: "100%", pointerEvents: "none", style: { position: 'absolute', top: 60, userSelect: 'none', height: '100%' } },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("marker", { id: "arrow", viewBox: "0 0 10 10", refX: "5", refY: "5", markerWidth: "9", markerHeight: "9", orient: "auto-start-reverse" },
                react_1.default.createElement("path", { d: "M 0 0 L 10 5 L 0 10 z", strokeLinejoin: "round" }))),
        react_1.default.createElement("g", { transform: "matrix(1,0,0,1," + -((props.scrollLeft || 0) - (props.nowposition || 0)) + "," + -(props.scrollTop || 0) + ")" },
            cache,
            renderCreateLink())));
};
exports.default = LinkViewPort;
