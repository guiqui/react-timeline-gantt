"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MIL_IN_HOUR = 1000 * 3600;
var DateHelper = /** @class */ (function () {
    function DateHelper() {
        var _this = this;
        this.dayToPosition = function (day, now, dayWidth) {
            return day * dayWidth + now;
        };
        this.daysInYear = function (year) {
            return _this.isLeapYear(year) ? 366 : 365;
        };
    }
    DateHelper.prototype.dateToPixel = function (input, nowposition, daywidth) {
        var nowDate = this.getToday(); //
        var inputTime = new Date(input);
        //Day light saving patch
        var lightSavingDiff = (inputTime.getTimezoneOffset() - nowDate.getTimezoneOffset()) * 60 * 1000;
        var timeDiff = inputTime.getTime() - nowDate.getTime() - lightSavingDiff;
        var pixelWeight = daywidth / 24; //Value in pixels of one hour
        return (timeDiff / MIL_IN_HOUR) * pixelWeight + nowposition;
    };
    DateHelper.prototype.pixelToDate = function (position, nowposition, daywidth) {
        var hoursInPixel = 24 / daywidth;
        var pixelsFromNow = position - nowposition;
        var today = this.getToday();
        var milisecondsFromNow = today.getTime() + pixelsFromNow * hoursInPixel * MIL_IN_HOUR;
        var result = new Date(milisecondsFromNow);
        var lightSavingDiff = (result.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
        result.setTime(result.getTime() + lightSavingDiff);
        return result;
    };
    DateHelper.prototype.getToday = function () {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    };
    DateHelper.prototype.monthDiff = function (start, end) {
        return Math.abs(end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear()));
    };
    DateHelper.prototype.daysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };
    DateHelper.prototype.isLeapYear = function (year) {
        return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    };
    return DateHelper;
}());
var helper = new DateHelper();
exports.default = helper;
