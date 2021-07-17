"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateHelper_1 = __importDefault(require("../helpers/DateHelper"));
var DAY_WIDTH = 24;
describe('Test DateToPixel Fuctionality', function () {
    test('Test get today ', function () {
        var result = DateHelper_1.default.getToday();
        var today = new Date();
        expect(result.getDay()).toBe(today.getDay());
        expect(result.getMonth()).toBe(today.getMonth());
        expect(result.getFullYear()).toBe(today.getFullYear());
        expect(result.getHours()).toBe(0);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(0);
    });
    test('When Today and now position  0', function () {
        var result = DateHelper_1.default.dateToPixel(DateHelper_1.default.getToday(), 0, DAY_WIDTH);
        expect(result).toBe(0);
    });
    test('When Today and now position  100 ', function () {
        var result = DateHelper_1.default.dateToPixel(DateHelper_1.default.getToday(), 100, DAY_WIDTH);
        expect(result).toBe(100);
    });
    test('When tomorrow and now position 0', function () {
        var tomorrow = DateHelper_1.default.getToday();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var result = DateHelper_1.default.dateToPixel(tomorrow, 0, DAY_WIDTH);
        expect(result).toBe(DAY_WIDTH);
    });
    test('When tomorrow and now position 100', function () {
        var tomorrow = DateHelper_1.default.getToday();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var result = DateHelper_1.default.dateToPixel(tomorrow, 100, DAY_WIDTH);
        expect(result).toBe(124);
    });
    test('When yesterday and now position 0', function () {
        var yesterday = DateHelper_1.default.getToday();
        yesterday.setDate(yesterday.getDate() - 1);
        var result = DateHelper_1.default.dateToPixel(yesterday, 0, DAY_WIDTH);
        expect(result).toBe(-DAY_WIDTH);
    });
    test('When yesterday and now position 100', function () {
        var yesterday = DateHelper_1.default.getToday();
        yesterday.setDate(yesterday.getDate() - 1);
        var result = DateHelper_1.default.dateToPixel(yesterday, 100, DAY_WIDTH);
        expect(result).toBe(76);
    });
});
describe('Test DateToPixel Fuctionality', function () {
    test('When Today and now position  0', function () {
        var now = DateHelper_1.default.getToday();
        var result = DateHelper_1.default.dateToPixel(now, 0, DAY_WIDTH);
        var date = DateHelper_1.default.pixelToDate(result, 0, DAY_WIDTH);
        expect(now.getTime() - date.getTime() < 10).toBe(true);
    });
    test('When Today and now position  100 ', function () {
        var now = DateHelper_1.default.getToday();
        var result = DateHelper_1.default.dateToPixel(now, 100, DAY_WIDTH);
        var date = DateHelper_1.default.pixelToDate(result, 100, DAY_WIDTH);
        expect(now.getTime() - date.getTime() < 10).toBe(true);
    });
    test('When tomorrow and now position 0', function () {
        var tomorrow = DateHelper_1.default.getToday();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var result = DateHelper_1.default.dateToPixel(tomorrow, 0, DAY_WIDTH);
        var date = DateHelper_1.default.pixelToDate(result, 0, DAY_WIDTH);
        expect(tomorrow.getTime() - date.getTime() < 10).toBe(true);
    });
    test('When tomorrow and now position 100', function () {
        var tomorrow = DateHelper_1.default.getToday();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var result = DateHelper_1.default.dateToPixel(tomorrow, 100, DAY_WIDTH);
        var date = DateHelper_1.default.pixelToDate(result, 100, DAY_WIDTH);
        expect(tomorrow.getTime() - date.getTime() < 10).toBe(true);
    });
});
describe('Test date difference', function () {
    test('Test with in the same month', function () {
        //(start,end,now,dayWidth)
        var start = new Date(2018, 9, 8);
        var end = new Date(2018, 9, 18);
        var result = DateHelper_1.default.monthDiff(start, end);
        expect(result).toBe(0);
    });
    test('Test different month same year', function () {
        //(start,end,now,dayWidth)
        var start = new Date(2018, 9, 8);
        var end = new Date(2018, 11, 18);
        var result = DateHelper_1.default.monthDiff(start, end);
        expect(result).toBe(2);
    });
    test('Test different month same year', function () {
        //(start,end,now,dayWidth)
        var start = new Date(2018, 9, 8);
        var end = new Date(2019, 11, 18);
        var result = DateHelper_1.default.monthDiff(start, end);
        expect(result).toBe(14);
    });
    test('Test different  start > end', function () {
        //(start,end,now,dayWidth)
        var start = new Date(2019, 9, 8);
        var end = new Date(2018, 11, 18);
        var result = DateHelper_1.default.monthDiff(start, end);
        expect(result).toBe(10);
    });
});
