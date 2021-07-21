"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ContentEditable_1 = __importDefault(require("./ContentEditable"));
var enzyme_1 = require("enzyme");
describe('ContentEditable Initialise propertly ', function () {
    it('It mount properly when no property is given', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(ContentEditable_1.default, { value: "Test" }));
        expect(wrapper.find('div').html()).toBe('<div style="width:100%"> Test</div>');
    });
    it('Change to input when focus', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(ContentEditable_1.default, { value: "Test" }));
        expect(wrapper.state().editing).toBe(false);
        wrapper.find('div').simulate('click');
        expect(wrapper.state().editing).toBe(true);
        expect(wrapper.find('input').html()).toBe('<input type="text" style="width:100%;outline-color:black;outline-style:oinset" name="name" value="Test"/>');
    });
    it('Update state when entering data', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(ContentEditable_1.default, { value: "Test" }));
        wrapper.find('div').simulate('click');
        expect(wrapper.state().value).toBe('Test');
        wrapper.find('input').simulate('change', { target: { value: 'a' } });
        expect(wrapper.state().value).toBe('a');
    });
    it('On press enter go back to not edit mode', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(ContentEditable_1.default, { value: "Test" }));
        wrapper.find('div').simulate('click');
        expect(wrapper.state().editing).toBe(true);
        wrapper.find('input').simulate('keyUp', { keyCode: 13 });
        expect(wrapper.state().editing).toBe(false);
        expect(wrapper.find('div').html()).toBe('<div style="width:100%"> Test</div>');
    });
    it('On Blur enter go back to not edit mode', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(ContentEditable_1.default, { value: "Test" }));
        wrapper.find('div').simulate('click');
        expect(wrapper.state().editing).toBe(true);
        wrapper.find('input').simulate('blur');
        expect(wrapper.state().editing).toBe(false);
        expect(wrapper.find('div').html()).toBe('<div style="width:100%"> Test</div>');
    });
    it('Call onChange call back when loose focus', function () {
        var mockCallback = jest.fn(function (value) { return "recived" + value; });
        var wrapper = enzyme_1.shallow(react_1.default.createElement(ContentEditable_1.default, { value: "Test", onChange: mockCallback }));
        wrapper.find('div').simulate('click');
        expect(wrapper.state().editing).toBe(true);
        wrapper.find('input').simulate('change', { target: { value: 'Callback' } });
        wrapper.find('input').simulate('keyUp', { keyCode: 13 });
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.results[0].value).toBe('recivedCallback');
    });
});
