"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var VerticalSpliter_1 = __importDefault(require("./VerticalSpliter"));
var enzyme_1 = require("enzyme");
describe('Testing Firing Events ', function () {
    it('Initialise Properly', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(VerticalSpliter_1.default, null));
        expect(wrapper.state().dragging).toBe(false);
        expect(wrapper.find('.squareGrip')).toHaveLength(4);
    });
    it('Handle mouse events', function () {
        var mockCallback = jest.fn();
        var stopPropagation = jest.fn();
        var wrapper = enzyme_1.shallow(react_1.default.createElement(VerticalSpliter_1.default, { onTaskListSizing: mockCallback }));
        expect(wrapper.state().dragging).toBe(false);
        expect(wrapper.instance().doMouseDown({ button: 1 }));
        expect(wrapper.state().dragging).toBe(false);
        expect(wrapper.instance().doMouseDown({ button: 0, clientX: 10 }));
        expect(wrapper.state().dragging).toBe(true);
        expect(wrapper.instance().draggingPosition).toBe(10);
        expect(mockCallback.mock.calls.length).toBe(0);
        wrapper.instance().doMouseMove({ clientX: 20, stopPropagation: stopPropagation });
        expect(wrapper.instance().draggingPosition).toBe(20);
        expect(stopPropagation.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toBe(-10);
        wrapper.instance().doMouseUp({});
        expect(wrapper.state().dragging).toBe(false);
    });
});
