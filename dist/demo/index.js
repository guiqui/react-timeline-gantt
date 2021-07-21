"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var App_1 = __importDefault(require("pages/App"));
var element = document.getElementById('react-container');
react_dom_1.default.render(react_1.default.createElement(App_1.default, null), document.getElementById('react-container'));
