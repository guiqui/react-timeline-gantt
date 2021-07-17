"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayWidth = exports.getBackgroundPosition = exports.getBackgroundWidth = void 0;
var Const_1 = require("../Const");
var getBackgroundWidth = function (mode) {
    switch (mode) {
        case 'year':
            return 7;
        case 'month':
            return 1;
        case 'week':
            return 1;
        case 'day':
            return 1 / 24;
        default:
            return 1;
    }
};
exports.getBackgroundWidth = getBackgroundWidth;
var getBackgroundPosition = function (mode) {
    switch (mode) {
        case 'year':
            return '12px';
        default:
            return 0;
    }
};
exports.getBackgroundPosition = getBackgroundPosition;
var getDayWidth = function (mode) {
    switch (mode) {
        case Const_1.VIEW_MODE_DAY:
            return Const_1.DAY_DAY_MODE;
        case Const_1.VIEW_MODE_WEEK:
            return Const_1.DAY_WEEK_MODE;
        case Const_1.VIEW_MODE_MONTH:
            return Const_1.DAY_MONTH_MODE;
        case Const_1.VIEW_MODE_YEAR:
            return Const_1.DAY_YEAR_MODE;
        default:
            return Const_1.DAY_MONTH_MODE;
    }
};
exports.getDayWidth = getDayWidth;
