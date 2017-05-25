import * as util from '../util';

export default function (target, name, descriptor) {
    if (target && name && descriptor) {
        return responseBody(target, name, descriptor);
    }

    return function (target, name, descriptor) {
        return responseBody(target, name, descriptor);
    }
}

function responseBody(target, name, descriptor) {
    const oldValue = descriptor.value;

    descriptor.value = function (...params) {
        let request = util.getRequest(params);

        request._YAN_CLIENT_RESPONSE_BODY = true;

        return oldValue.apply(null, util.newArgs(request, params));
    };

    return descriptor;
}