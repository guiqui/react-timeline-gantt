"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CreateLink_1 = __importDefault(require("./CreateLink"));
var enzyme_1 = require("enzyme");
describe('Testing Firing Events ', function () {
    it('Initialise Properly and not null pointer', function () {
        var position = { x: 10, y: 10 };
        var wrapper = enzyme_1.shallow(react_1.default.createElement(CreateLink_1.default, { start: position }));
        expect(wrapper.instance().lastX).toBe(-1);
        expect(wrapper.instance().lastY).toBe(-1);
        expect(wrapper.state().x).toBe(10);
        expect(wrapper.state().y).toBe(10);
        expect(wrapper.instance().init).toBe(false);
    });
    it('It handle mousmove and mouse up', function () {
        var onFinishCreateLink = jest.fn();
        var position = { x: 10, y: 10 };
        var wrapper = enzyme_1.shallow(react_1.default.createElement(CreateLink_1.default, { start: position, onFinishCreateLink: onFinishCreateLink }));
        wrapper.instance().doMouseMove({ clientX: 1, clientY: 2 });
        expect(wrapper.instance().lastX).toBe(1);
        expect(wrapper.instance().lastY).toBe(2);
        expect(wrapper.state().x).toBe(10);
        expect(wrapper.state().y).toBe(10);
        expect(wrapper.instance().init).toBe(true);
        wrapper.instance().doMouseMove({ clientX: 2, clientY: 3 });
        expect(wrapper.state().x).toBe(11);
        expect(wrapper.state().y).toBe(11);
        wrapper.instance().doMouseUp({});
        expect(onFinishCreateLink.mock.calls.length).toBe(1);
    });
});
//
