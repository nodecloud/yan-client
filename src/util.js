import _ from 'lodash';

export function getRequest(params) {
    let request = {_YAN_CLIENT: true};
    if (params[0] && params[0]._YAN_CLIENT) {
        request = params[0];
        params.shift();
    }

    return request;
}

export function newArgs(request, params) {
    const newArgs = [request];
    params.forEach(param => newArgs.push(param));

    return newArgs;
}

export function mergeParams(paramTypeAndKeys, params) {
    let request = getRequest(params);
    for (let i = 0; i < paramTypeAndKeys.length; i++) {
        //TODO valid paramAndType.
        const typeAndKey = paramTypeAndKeys[i].trim().split(":");
        const type = typeAndKey[0];
        const key = typeAndKey[1];
        const value = params[i];
        if (value === undefined) {
            continue;
        }

        if (type === 'endpoint') {
            //TODO valid url.
            request.url = (value + (request.url || ''));
        }

        if (!key) {
            _.set(request, type, params[i]);
        } else {
            _.set(request, `${type}.${key}`, params[i]);
        }
    }

    return request;
}