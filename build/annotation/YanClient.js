'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (client, options) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = (() => {
            var _ref = _asyncToGenerator(function* (...params) {
                const returnBody = params[0]._YAN_CLIENT_RESPONSE_BODY;
                const returnHeader = params[0]._YAN_CLIENT_RESPONSE_HEADER;

                delete params[0]._YAN_CLIENT;
                delete params[0]._YAN_CLIENT_RESPONSE_BODY;
                delete params[0]._YAN_CLIENT_RESPONSE_HEADER;

                const response = (yield client) && client.send ? client.send(params[0]) : defaultClient.send(params[0]);

                if (!response) {
                    throw new Error("The http client was no response, please check it");
                }

                if (response.body && returnBody) {
                    return response.body;
                } else if (response.header && returnHeader) {
                    return response.header;
                } else {
                    return response;
                }
            });

            return function () {
                return _ref.apply(this, arguments);
            };
        })();

        return descriptor;
    };
};

var _util = require('../util');

var util = _interopRequireWildcard(_util);

var _HttpClient = require('../HttpClient');

var defaultClient = _interopRequireWildcard(_HttpClient);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }