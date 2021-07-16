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
var Registry_1 = __importDefault(require("../../helpers/registry/Registry"));
var Link_1 = __importDefault(require("./Link"));
var CreateLink_1 = __importDefault(require("./CreateLink"));
var DateHelper_1 = __importDefault(require("../../helpers/DateHelper"));
var LinkViewPort = /** @class */ (function (_super) {
    __extends(LinkViewPort, _super);
    function LinkViewPort(props) {
        var _this = _super.call(this, props) || this;
        _this.getItemPosition = function (index, date) {
            var x = DateHelper_1.default.dateToPixel(date, 0, _this.props.dayWidth);
            var y = index * _this.props.itemheight + _this.props.itemheight / 2;
            return { x: x, y: y };
        };
        _this.renderCreateLink = function () {
            if (_this.props.interactiveMode) {
                var record = Registry_1.default.getTask(_this.props.taskToCreate.task.id);
                var position = _this.getItemPosition(record.index, record.item.end);
                return react_1.default.createElement(CreateLink_1.default, { start: position, onFinishCreateLink: _this.props.onFinishCreateLink });
            }
        };
        _this.renderChangingTaskLinks = function () {
            if (_this.props.changingTask != _this.state.changingTask) {
                _this.setState({ changingTask: _this.props.changingTask });
                //Get Links from task
                var links = Registry_1.default.getLinks(_this.state.changingTask.item.id);
                if (!links)
                    return;
                var item = null;
                var startItem = null;
                var endItem = null;
                var startPosition = {};
                var endPosition = {};
                for (var i = 0; i < links.length; i++) {
                    item = links[i];
                    startItem = Registry_1.default.getTask(item.link.start);
                    if (!startItem)
                        continue;
                    endItem = Registry_1.default.getTask(item.link.end);
                    if (!endItem)
                        continue;
                    startPosition = _this.getItemPosition(startItem.index, startItem.item.end);
                    if (_this.state.changingTask.item.id == item.link.start)
                        startPosition.x = _this.state.changingTask.position.end;
                    endPosition = _this.getItemPosition(endItem.index, endItem.item.start);
                    if (_this.state.changingTask.item.id == item.link.end)
                        endPosition.x = _this.state.changingTask.position.start;
                    _this.cache[item.index] = (react_1.default.createElement(Link_1.default, { key: -i - 1, item: item, start: { x: startPosition.x, y: startPosition.y }, end: { x: endPosition.x, y: endPosition.y }, isSelected: _this.props.selectedItem == item, onSelectItem: _this.props.onSelectItem }));
                    _this.cache = __spreadArray([], _this.cache);
                }
            }
        };
        _this.cache = [];
        _this.state = { links: [], data: [], selectedItem: null };
        return _this;
    }
    LinkViewPort.prototype.renderLink = function (startItem, endItem, link, key) {
        var startPosition = this.getItemPosition(startItem.index, startItem.item.end);
        var endPosition = this.getItemPosition(endItem.index, endItem.item.start);
        return (react_1.default.createElement(Link_1.default, { key: key, item: link, start: { x: startPosition.x, y: startPosition.y }, end: { x: endPosition.x, y: endPosition.y }, isSelected: this.props.selectedItem == link, onSelectItem: this.props.onSelectItem }));
    };
    LinkViewPort.prototype.renderLinks = function () {
        this.cache = [];
        var renderLinks = {};
        var startItem, endItem = {};
        if (this.state.data.length == 0)
            return;
        for (var i = 0; i < this.state.links.length; i++) {
            var link = this.state.links[i];
            if (!link)
                if (renderLinks[link.id])
                    continue;
            startItem = Registry_1.default.getTask(link.start);
            if (!startItem) {
                this.cache.push(null);
                continue;
            }
            endItem = Registry_1.default.getTask(link.end);
            if (!endItem) {
                this.cache.push(null);
                continue;
            }
            this.cache.push(this.renderLink(startItem, endItem, link, i));
            renderLinks[link.id] = '';
        }
    };
    LinkViewPort.prototype.refreshData = function () {
        if (this.props.links != this.state.links ||
            this.props.data != this.state.data ||
            this.props.dayWidth != this.state.dayWidth ||
            this.props.selectedItem != this.state.selectedItem) {
            this.setState({
                selectedItem: this.props.selectedItem,
                dayWidth: this.props.dayWidth,
                links: this.props.links,
                data: this.props.data
            });
            if (this.state.links && this.state.data)
                this.renderLinks();
        }
    };
    LinkViewPort.prototype.render = function () {
        this.refreshData();
        this.renderChangingTaskLinks();
        return (react_1.default.createElement("svg", { x: 0, y: 0, width: "100%", pointerEvents: "none", style: { position: 'absolute', top: 60, userSelect: 'none', height: '100%' } },
            react_1.default.createElement("defs", null,
                react_1.default.createElement("marker", { id: "arrow", viewBox: "0 0 10 10", refX: "5", refY: "5", markerWidth: "9", markerHeight: "9", orient: "auto-start-reverse" },
                    react_1.default.createElement("path", { d: "M 0 0 L 10 5 L 0 10 z", strokeLinejoin: "round" }))),
            react_1.default.createElement("g", { transform: "matrix(1,0,0,1," + -(this.props.scrollLeft - this.props.nowposition) + "," + -this.props.scrollTop + ")" },
                this.cache,
                this.renderCreateLink())));
    };
    return LinkViewPort;
}(react_1.Component));
exports.default = LinkViewPort;
