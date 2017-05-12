import * as util from '../util';

export default function (...paramTypeAndKeys) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = function (...params) {
            let request = util.mergeParams(paramTypeAndKeys, params);

            return oldValue.apply(null, util.newArgs(request, params));
        };

        return descriptor;
    }
}