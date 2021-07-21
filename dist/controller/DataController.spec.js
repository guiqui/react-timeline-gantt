"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DataController_1 = __importDefault(require("../controller/DataController"));
var DateHelper_1 = __importDefault(require("../helpers/DateHelper"));
describe('Test DataController ', function () {
    test('Initialise Properly ', function () {
        var dataController = new DataController_1.default();
        var mockCallback = jest.fn();
        dataController.onHorizonChange = mockCallback;
        //start,end,nowposition,daywidth
        dataController.initialise(0, 101, 2, 30);
        expect(dataController.nowposition).toBe(2);
        expect(dataController.daywidth).toBe(30);
        expect(dataController.lower_limit).toBe(-1000);
        expect(dataController.lower_data_limit).toBe(-750);
        expect(dataController.upper_limit).toBe(1101);
        expect(dataController.upper_data_limit).toBe(851);
        expect(mockCallback.mock.calls.length).toBe(1);
        var lowerLimit = DateHelper_1.default.pixelToDate(dataController.lower_limit, dataController.nowposition, dataController.daywidth);
        var upLimit = DateHelper_1.default.pixelToDate(dataController.upper_limit, dataController.nowposition, dataController.daywidth);
        expect(mockCallback.mock.calls[0][0].getDay()).toBe(lowerLimit.getDay());
        expect(mockCallback.mock.calls[0][0].getMonth()).toBe(lowerLimit.getMonth());
        expect(mockCallback.mock.calls[0][1].getDay()).toBe(upLimit.getDay());
        expect(mockCallback.mock.calls[0][1].getMonth()).toBe(upLimit.getMonth());
    });
    test('Testing changing Start End date ', function () {
        var dataController = new DataController_1.default();
        var mockCallback = jest.fn();
        dataController.onHorizonChange = mockCallback;
        //start,end,nowposition,daywidth
        dataController.initialise(0, 100, 0, 30);
        dataController.setStartEnd(-100, 0, 0, 30);
        expect(mockCallback.mock.calls.length).toBe(1);
        dataController.setStartEnd(-756, 0, 0, 30);
        expect(mockCallback.mock.calls.length).toBe(2);
        expect(dataController.lower_limit).toBe(-1756);
        expect(dataController.lower_data_limit).toBe(-1506);
        expect(dataController.upper_limit).toBe(1000);
        expect(dataController.upper_data_limit).toBe(750);
    });
});
