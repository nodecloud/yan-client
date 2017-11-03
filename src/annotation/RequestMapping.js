import * as util from '../util';

export default function (method, url) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = function (...params) {
            let request = util.getRequest(params);

            request.url = url;
            request.method = method;

            return oldValue.apply(null, util.newArgs(request, params));
        };

        return descriptor;
    }
}