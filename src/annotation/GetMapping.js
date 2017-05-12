import * as util from '../util';

export default function (url) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = function (...params) {
            let request = util.getRequest(params);

            request.url = url;
            request.method = 'get';

            return oldValue.apply(null, util.newArgs(request, params));
        };

        return descriptor;
    }
}