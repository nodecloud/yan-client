'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRequest = getRequest;
exports.newArgs = newArgs;
exports.mergeParams = mergeParams;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRequest(params) {
    let request = { _YAN_CLIENT: true, params: {}, headers: {}, qs: {}, body: {} };
    if (params[0] && params[0]._YAN_CLIENT) {
        request = params[0];
        params.shift();
    }

    return request;
}

function newArgs(request, params) {
    const newArgs = [request];
    params.forEach(param => newArgs.push(param));

    return newArgs;
}

function mergeParams(paramTypeAndKeys, params) {
    let request = getRequest(params);
    for (let i = 0; i < paramTypeAndKeys.length; i++) {
        //TODO valid paramAndType.
        const typeAndKey = paramTypeAndKeys[i].trim().split(":");
        const type = typeAndKey[0];
        const key = typeAndKey[1];
        const value = params[i];
        if (value === undefined) {
            continue;
        }

        if (type === 'endpoint') {
            //TODO valid url.
            request.url = value + (request.url || '');
        }

        if (!key) {
            _lodash2.default.set(request, type, params[i]);
        } else {
            _lodash2.default.set(request, `${type}.${key}`, params[i]);
        }
    }

    return request;
}