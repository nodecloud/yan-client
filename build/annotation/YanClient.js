'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (client, options) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = function (...params) {
            if (!client) {
                throw new Error('No client for using.');
            }

            delete params[0]._YAN_CLIENT;
            return client && client.send ? client.send(params[0]) : defaultClient.send(params[0]);
        };

        return descriptor;
    };
};

var _util = require('../util');

var util = _interopRequireWildcard(_util);

var _HttpClient = require('../HttpClient');

var defaultClient = _interopRequireWildcard(_HttpClient);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }