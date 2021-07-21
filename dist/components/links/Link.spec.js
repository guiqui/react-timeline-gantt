"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Link_1 = __importDefault(require("./Link"));
var enzyme_1 = require("enzyme");
describe('Testing Links ', function () {
    it('Test when start is less than end in X', function () {
        var start = { x: 10, y: 30 };
        var end = { x: 100, y: 200 };
        var wrapper = enzyme_1.shallow(react_1.default.createElement(Link_1.default, { start: start, end: end }));
        var coordinates = wrapper.instance().calcNormCoordinates();
        expect(coordinates.cpt1.x).toBe(55);
        expect(coordinates.cpt1.y).toBe(30);
        expect(coordinates.cpt2.x).toBe(55);
        expect(coordinates.cpt2.y).toBe(200);
        var path = wrapper.instance().getPath(coordinates);
        expect(path).toBe('M10 30  55 30 55 200 100 200');
    });
    it('Test when start is less than end in X', function () {
        var start = { x: 110, y: 30 };
        var end = { x: 100, y: 200 };
        var wrapper = enzyme_1.shallow(react_1.default.createElement(Link_1.default, { start: start, end: end }));
        var coordinates = wrapper.instance().calcSCoordinates();
        expect(coordinates.cpt1.x).toBe(110 + 20);
        expect(coordinates.cpt1.y).toBe(30);
        expect(coordinates.cpt2.x).toBe(130);
        expect(coordinates.cpt2.y).toBe(115);
        expect(coordinates.cpt3.x).toBe(80);
        expect(coordinates.cpt3.y).toBe(115);
        expect(coordinates.cpt4.x).toBe(80);
        expect(coordinates.cpt4.y).toBe(200);
        var path = wrapper.instance().getPath(coordinates);
        expect(path).toBe('M110 30  130 30 130 115 80 115 80 200 100 200');
    });
});
