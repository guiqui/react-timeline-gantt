"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
var enzyme_1 = __importDefault(require("enzyme"));
var enzyme_adapter_react_17_1 = __importDefault(require("@wojtekmaj/enzyme-adapter-react-17"));
var McLocalStorageMock = /** @class */ (function () {
    function McLocalStorageMock() {
        this.key = 0;
        this.length = 0;
        this.store = {};
    }
    McLocalStorageMock.prototype.clear = function () {
        this.store = {};
    };
    McLocalStorageMock.prototype.getItem = function (key) {
        return this.store[key] || null;
    };
    McLocalStorageMock.prototype.setItem = function (key, value) {
        this.store[key] = value.toString();
    };
    McLocalStorageMock.prototype.removeItem = function (key) {
        delete this.store[key];
    };
    return McLocalStorageMock;
}());
enzyme_1.default.configure({ adapter: new enzyme_adapter_react_17_1.default() });
global.localStorage = new McLocalStorageMock();
global.fetch = jest_fetch_mock_1.default;
