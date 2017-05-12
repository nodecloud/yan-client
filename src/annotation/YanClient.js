import * as util from '../util';
import * as defaultClient from '../HttpClient';

export default function (client, options) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = function (...params) {
            if (!client) {
                throw new Error('No client for using.');
            }

            delete params[0]._YAN_CLIENT;
            return client && client.send ? client.send(params[0]) : defaultClient.send(params[0]);
        };

        return descriptor;
    }
}