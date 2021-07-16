"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var LinkViewPort_1 = __importDefault(require("./LinkViewPort"));
var Registry_1 = __importDefault(require("../../helpers/registry/Registry"));
var enzyme_1 = require("enzyme");
describe('Testing LinksViewPort ', function () {
    it('Initialise Properly and not null pointer', function () {
        var wrapper = enzyme_1.shallow(react_1.default.createElement(LinkViewPort_1.default, null));
        expect(wrapper.state().data).toBeUndefined();
        expect(wrapper.state().links).toBeUndefined();
        expect(wrapper.instance().cache).toHaveLength(0);
    });
    it('Render properly when data is pass', function () {
        var data = [];
        for (var i = 0; i < 20; i++) {
            data.push({ name: "Task Today", id: i, start: new Date(), end: new Date().setDate(new Date().getDate(), 5), color: 'red' });
        }
        Registry_1.default.registerData(data);
        var links = [];
        for (var i = 0; i < 20; i++) {
            links.push({ id: i, start: i, end: i });
        }
        Registry_1.default.registerLinks(data);
        var wrapper = enzyme_1.mount(react_1.default.createElement(LinkViewPort_1.default, { startRow: 0, endRow: 0, data: data, nowposition: 0, dayWidth: 30, links: links }));
        expect(wrapper.instance().cache).toHaveLength(20);
        var renderItems = wrapper.instance().cache;
        expect(wrapper.find('.timeline-link')).toHaveLength(20);
        // wrapper.find('.timeline-link').forEach((node)=>{
        //     expect(node).toHaveLength(20)
        // })
    });
});
