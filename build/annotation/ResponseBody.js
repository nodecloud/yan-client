'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (target, name, descriptor) {
    if (target && name && descriptor) {
        return responseBody(target, name, descriptor);
    }

    return function (target, name, descriptor) {
        return responseBody(target, name, descriptor);
    };
};

var _util = require('../util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function responseBody(target, name, descriptor) {
    const oldValue = descriptor.value;

    descriptor.value = function (...params) {
        let request = util.getRequest(params);

        request._YAN_CLIENT_RESPONSE_BODY = true;

        return oldValue.apply(null, util.newArgs(request, params));
    };

    return descriptor;
}