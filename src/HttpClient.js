//common lib
import util from 'lodash';
import rp from 'request-promise';
import uriParams from 'uri-params';

/**
 * Send http request.
 *
 * @param options
 * @return {Promise.<*>}
 */
export function send(options = {}) {

    //compile uri params.
    if (options.url && options.params) {
        options.url = uriParams(options.url, options.params);
    }

    //set default configuration.
    if (!util.has(options, 'resolveWithFullResponse')) {
        options.resolveWithFullResponse = true;
    }
    if (!util.has(options, 'json')) {
        options.json = true;
    }

    return rp(options);
}