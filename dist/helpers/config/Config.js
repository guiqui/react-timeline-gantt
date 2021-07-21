"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defvalues = {
    header: {
        top: {
            style: {
                backgroundColor: '#333333',
                fontSize: 10,
                color: 'white',
                textAlign: 'center'
            }
        },
        middle: {
            style: {
                backgroundColor: 'chocolate'
            },
            selectedStyle: {
                backgroundColor: '#b13525',
                fontWeight: 'bold'
            }
        },
        bottom: {
            style: {
                background: '#f3f4f5',
                color: '#667280',
                fontSize: '.9em'
            },
            selectedStyle: {
                backgroundColor: '#b13525',
                fontWeight: 'bold'
            }
        }
    },
    taskList: {
        title: {
            label: 'Projects',
            style: {
                backgroundColor: '#333333',
                borderBottom: 'solid 1px silver',
                color: 'white',
                textAlign: 'center'
            }
        },
        task: {
            style: {
                backgroundColor: '#fbf9f9'
            }
        },
        verticalSeparator: {
            style: {
                backgroundColor: '#333333'
            },
            grip: {
                style: {
                    backgroundColor: '#cfcfcd'
                }
            }
        }
    },
    dataViewPort: {
        rows: {
            style: {}
        },
        task: {
            showLabel: false,
            style: {
                position: 'absolute',
                borderRadius: 14,
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'grey'
            },
            selectedStyle: {
                position: 'absolute',
                borderRadius: 14,
                border: 'solid 1px #ff00fa',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'grey'
            }
        }
    },
    links: {
        color: 'black',
        selectedColor: '#ff00fa'
    }
};
var Config = /** @class */ (function () {
    function Config() {
        var _this = this;
        this.load = function (values) {
            _this.data = {};
            if (values)
                _this.populate(values, defvalues, _this.data);
            else
                _this.data = defvalues;
        };
        this.data = defvalues;
    }
    Config.prototype.populate = function (values, defvalues, final) {
        if (!this.isObject(defvalues))
            return;
        for (var key in defvalues) {
            if (!values[key]) {
                //if not exits
                final[key] = defvalues[key];
            }
            else {
                //if it does
                final[key] = values[key];
                this.populate(values[key], defvalues[key], final[key]);
            }
        }
    };
    Config.prototype.isObject = function (value) {
        if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number')
            return false;
        return true;
    };
    Object.defineProperty(Config.prototype, "values", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return Config;
}());
var config = new Config();
exports.default = config;
