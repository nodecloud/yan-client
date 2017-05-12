import * as util from '../util';

export default function (key, value) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = function (...params) {
            let request = util.getRequest(params);

            request.headers[key] = value;

            return oldValue.apply(null, util.newArgs(request, params));
        };

        return descriptor;
    }
}