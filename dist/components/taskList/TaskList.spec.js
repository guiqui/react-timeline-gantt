"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TaskList_1 = __importDefault(require("./TaskList"));
var enzyme_1 = require("enzyme");
describe('Testing Firing Events ', function () {
    it('Initialise Properly and not null pointer', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(TaskList_1.default, null));
        expect(wrapper.instance().containerStyle.height).toBe(10);
    });
    it('It render and interact properly', function () {
        var itemheight = 30;
        var data = [];
        var onSelectItem = jest.fn();
        for (var i = 0; i < 20; i++) {
            data.push({ name: "Task Today", start: new Date(), end: new Date().setDate(new Date().getDate(), 5), color: 'red' });
        }
        var wrapper = enzyme_1.mount(react_1.default.createElement(TaskList_1.default, { data: data, startRow: 0, endRow: 17, onSelectItem: onSelectItem, itemheight: itemheight }));
        expect(wrapper.instance().containerStyle.height).toBe(itemheight * data.length);
        expect(wrapper.find('.timeLine-side-task-row')).toHaveLength(18);
        var count = 0;
        wrapper.find('.timeLine-side-task-row').forEach(function (node) {
            expect(node.props().style.top).toBe(count * itemheight);
            node.simulate('click');
            count = count + 1;
        });
        expect(onSelectItem.mock.calls.length).toBe(18);
        for (var i = 0; i < 18; i++) {
            expect(onSelectItem.mock.calls[i][0]).toBe(data[i]);
        }
        wrapper.unmount();
    });
});
