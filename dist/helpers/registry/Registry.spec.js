"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Registry_1 = __importDefault(require("./Registry"));
test('Registering Task', function () {
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({ name: "Task Today", id: i, start: new Date(), end: new Date().setDate(new Date().getDate() + 5), color: 'red' });
    }
    Registry_1.default.registerData(data);
    expect(Registry_1.default.getTask(0).item.id).toBe(0);
    expect(Registry_1.default.getTask(0).index).toBe(0);
    expect(Registry_1.default.getTask(19).item.id).toBe(19);
    expect(Registry_1.default.getTask(19).index).toBe(19);
    Registry_1.default.registerData(null);
    expect(Registry_1.default.getTask(0).item.id).toBe(0);
    expect(Registry_1.default.getTask(0).index).toBe(0);
});
test('Registering Task', function () {
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({ id: i, start: i, end: i });
    }
    Registry_1.default.registerLinks(data);
    expect(Registry_1.default.getLinks(0)).toHaveLength(1);
    expect(Registry_1.default.getLinks(0)[0].index).toBe(0);
    expect(Registry_1.default.getLinks(0)[0].link.start).toBe(0);
    expect(Registry_1.default.getLinks(0)[0].link.end).toBe(0);
    expect(Registry_1.default.getLinks(19)).toHaveLength(1);
    expect(Registry_1.default.getLinks(19)[0].index).toBe(19);
    expect(Registry_1.default.getLinks(19)[0].link.start).toBe(19);
    expect(Registry_1.default.getLinks(19)[0].link.end).toBe(19);
});
