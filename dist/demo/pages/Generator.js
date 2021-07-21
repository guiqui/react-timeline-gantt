"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectHelper_1 = __importDefault(require("./ObjectHelper"));
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.generateData = function () {
        var data = [];
        var links = [];
        var now = new Date();
        var nowId = this.addRecord(now, 0, data);
        var test = new Date();
        test.setDate(test.getDate() + 3);
        test.setHours(0, 0, 0, 0);
        var tomorrowId = this.addRecord(test, 1, data);
        // this.addLink(nowId,tomorrowId,links)
        for (var i = 1; i < 1000; i++) {
            this.addRecord(this.randomDate(new Date(2016, 9, 1), new Date(2020, 9, 1)), i, data);
        }
        var start = 0;
        var end = 0;
        for (var i = 1; i < 100; i++) {
            start = Math.trunc(Math.random() * 1000);
            end = Math.trunc(Math.random() * 1000);
            this.addLink(data[start].id, data[end].id, links);
        }
        return { data: data, links: links };
    };
    Generator.prototype.addRecord = function (starDate, i, result) {
        var endDate = new Date(starDate.getTime());
        endDate.setDate(starDate.getDate() + Math.random() * 20);
        var id = ObjectHelper_1.default.genID();
        var record = { id: id, name: "Task " + i, start: starDate, end: endDate, color: this.getRandomColor() };
        result.push(record);
        return id;
    };
    Generator.prototype.addLink = function (startId, endId, list) {
        var id = ObjectHelper_1.default.genID();
        var record = { id: id, start: startId, startPosition: 1, end: endId, endPosition: 0 };
        list.push(record);
        return id;
    };
    Generator.prototype.createLink = function (start, end) {
        return { id: ObjectHelper_1.default.genID(), start: start.task.id, startPosition: start.position, end: end.task.id, endPosition: end.position };
    };
    Generator.prototype.randomDate = function (start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    Generator.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    Generator.prototype.setRandomColor = function () {
        $('#colorpad').css('background-color', getRandomColor());
    };
    return Generator;
}());
var instance = new Generator();
exports.default = instance;
