"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Headers_1 = __importDefault(require("./Headers"));
var Const_1 = require("../../Const");
var Const_2 = require("../../Const");
var moment_1 = __importDefault(require("moment"));
var enzyme_1 = require("enzyme");
describe('Header Init ', function () {
    it('It mount properly when no property is given', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(Headers_1.default, null));
        expect(wrapper.find('.header-top').children()).toHaveLength(0);
        expect(wrapper.find('.header-middle').children()).toHaveLength(0);
        expect(wrapper.find('.header-bottom').children()).toHaveLength(0);
    });
    it('When mode is year it draws correctly', function () {
        //calculateMonthData(start,end,now,dayWidth)
        var now = 0;
        var dayWidth = 30;
        var wrapper = enzyme_1.shallow(react_1.default.createElement(Headers_1.default, { numVisibleDays: 30, currentday: 0, nowposition: now, dayWidth: dayWidth, mode: Const_2.VIEW_MODE_YEAR, scrollLeft: 0 }));
        var startDate = moment_1.default().add(-Const_1.BUFFER_DAYS, 'days');
        var endDate = moment_1.default().add(30 + Const_1.BUFFER_DAYS, 'days');
        var years = endDate.year() - startDate.year() + 1;
        expect(wrapper.find('.header-top').children()).toHaveLength(years);
        var months = Math.ceil(endDate.diff(startDate, 'months', true));
        expect(wrapper.find('.header-middle').children()).toHaveLength(months + 1);
        var weeks = Math.ceil(endDate.diff(startDate, 'weeks', true));
        expect(wrapper.find('.header-bottom').children()).toHaveLength(weeks * 2);
    });
    it('When mode is month it draws correctly', function () {
        //calculateMonthData(start,end,now,dayWidth)
        var now = 0;
        var dayWidth = 30;
        var wrapper = enzyme_1.shallow(react_1.default.createElement(Headers_1.default, { numVisibleDays: 30, currentday: 0, nowposition: now, dayWidth: dayWidth, mode: Const_2.VIEW_MODE_MONTH, scrollLeft: 0 }));
        var startDate = moment_1.default().add(-Const_1.BUFFER_DAYS, 'days');
        var endDate = moment_1.default().add(30 + Const_1.BUFFER_DAYS, 'days');
        var months = Math.ceil(endDate.diff(startDate, 'months', true));
        expect(wrapper.find('.header-top').children()).toHaveLength(months + 1);
        var days = Math.trunc(endDate.diff(startDate, 'days', true));
        expect(wrapper.find('.header-middle').children()).toHaveLength(days);
        expect(wrapper.find('.header-bottom').children()).toHaveLength(days * 2);
    });
});
