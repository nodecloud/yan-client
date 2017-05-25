import * as util from '../util';
import * as defaultClient from '../HttpClient';

export default function (client, options) {
    return function (target, name, descriptor) {
        const oldValue = descriptor.value;

        descriptor.value = async function (...params) {
            const returnBody = params[0]._YAN_CLIENT_RESPONSE_BODY;
            const returnHeader = params[0]._YAN_CLIENT_RESPONSE_HEADER;

            delete params[0]._YAN_CLIENT;
            delete params[0]._YAN_CLIENT_RESPONSE_BODY;
            delete params[0]._YAN_CLIENT_RESPONSE_HEADER;

            const response = await (client && client.send ? client.send(params[0]) : defaultClient.send(params[0]));

            if (!response) {
                throw new Error("The http client was no response, please check it");
            }

            if (response.body && returnBody) {
                return response.body;
            } else if (response.header && returnHeader) {
                return response.header;
            } else {
                return response;
            }
        };

        return descriptor;
    }
}