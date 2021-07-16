"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Registry = /** @class */ (function () {
    function Registry() {
        this.data = {};
        this.link = {};
    }
    Registry.prototype.registerData = function (list) {
        if (!list)
            return;
        this.data = {};
        for (var i = 0; i < list.length; i++) {
            this.data[list[i].id] = { item: list[i], index: i };
        }
    };
    Registry.prototype.registerLinks = function (list) {
        if (!list)
            return;
        this.link = {};
        var start = 0;
        var end = 0;
        for (var i = 0; i < list.length; i++) {
            start = list[i].start;
            end = list[i].end;
            var value = { link: list[i], index: i };
            this.createAddTo(start, this.link, value, i);
            this.createAddTo(end, this.link, value, i);
        }
    };
    Registry.prototype.createAddTo = function (id, list, value, index) {
        if (!list[id])
            list[id] = [];
        if (list[id].indexOf(value) == -1)
            list[id].push(value);
    };
    Registry.prototype.getTask = function (id) {
        return this.data[id];
    };
    Registry.prototype.getLinks = function (id) {
        return this.link[id];
    };
    return Registry;
}());
var instanceRegistry = new Registry();
exports.default = instanceRegistry;
