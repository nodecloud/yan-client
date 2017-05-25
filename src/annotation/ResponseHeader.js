import * as util from '../util';

export default function (target, name, descriptor) {
    if (target && name && descriptor) {
        return responseHeader(target, name, descriptor);
    }
    
    return function (target, name, descriptor) {
        return responseHeader(target, name, descriptor);
    }
}

function responseHeader(target, name, descriptor) {
    const oldValue = descriptor.value;

    descriptor.value = function (...params) {
        let request = util.getRequest(params);

        request._YAN_CLIENT_RESPONSE_HEADER = true;

        return oldValue.apply(null, util.newArgs(request, params));
    };

    return descriptor;
}