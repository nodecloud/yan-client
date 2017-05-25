import * as util from '../util';

export default function (url) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = function (...params) {
            let request = util.getRequest(params);

            request._YAN_CLIENT_RESPONSE_BODY = true;

            return oldValue.apply(null, util.newArgs(request, params));
        };

        return descriptor;
    }
}