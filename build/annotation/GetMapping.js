'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (url) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = function (...params) {
            let request = util.getRequest(params);

            request.url = url;
            request.method = 'get';

            return oldValue.apply(null, util.newArgs(request, params));
        };

        return descriptor;
    };
};

var _util = require('../util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }