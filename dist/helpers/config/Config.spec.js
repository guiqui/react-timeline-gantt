"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __importDefault(require("../../helpers/config/Config"));
describe('Test Configuration Class', function () {
    it('It populates with defaults when no config is sent', function () {
        Config_1.default.load();
        var actualConfig = Config_1.default.values;
        expect(actualConfig['header']['top']['style']['backgroundColor']).toBe('#333333');
    });
    it('It populates with defaults when no config is sent', function () {
        var newvalues = { header: { top: { style: { backgroundColor: 'yellow' } } } };
        Config_1.default.load(newvalues);
        var actualConfig = Config_1.default.values;
        expect(actualConfig['header']['top']['style']['backgroundColor']).toBe('yellow');
        expect(actualConfig['header']['middle']['style']['backgroundColor']).toBe('chocolate');
    });
});
