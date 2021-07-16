"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateHelper_1 = __importDefault(require("../helpers/DateHelper"));
var HORIZON_BUFFER = 1000;
var HORIZON_BUFFER_ALERT = 750;
var DataController = /** @class */ (function () {
    function DataController() {
        var _this = this;
        this.initialise = function (start, end, nowposition, daywidth) {
            _this.nowposition = nowposition;
            _this.daywidth = daywidth;
            _this.setLimits(start, end);
            _this.loadDataHorizon();
        };
        //OnScroll
        this.setStartEnd = function (start, end, nowposition, daywidth) {
            _this.nowposition = nowposition;
            _this.daywidth = daywidth;
            if (_this.needData(start, end)) {
                _this.setLimits(start, end);
                _this.loadDataHorizon();
            }
        };
        this.needData = function (start, end) {
            return start < _this.lower_data_limit || end > _this.upper_data_limit;
        };
        this.setLimits = function (start, end) {
            _this.lower_limit = start - HORIZON_BUFFER;
            _this.lower_data_limit = start - HORIZON_BUFFER_ALERT;
            _this.upper_limit = end + HORIZON_BUFFER;
            _this.upper_data_limit = end + HORIZON_BUFFER_ALERT;
        };
        //OnScroll
        this.loadDataHorizon = function () {
            var lowerLimit = DateHelper_1.default.pixelToDate(_this.lower_limit, _this.nowposition, _this.daywidth);
            var upLimit = DateHelper_1.default.pixelToDate(_this.upper_limit, _this.nowposition, _this.daywidth);
            _this.onHorizonChange(lowerLimit, upLimit);
        };
        this.lower_limit = 0;
        this.upper_limit = 0;
        this._dataToRender = [];
    }
    DataController.prototype.onHorizonChange = function (lowerLimit, upLimit) {
        throw new Error('Method not implemented.');
    };
    return DataController;
}());
exports.default = DataController;
