import es6Promise from 'es6-promise';
es6Promise.polyfill();

import 'isomorphic-fetch';
import querystring from 'querystring';

export default class Transmitter {

    constructor(initialConfig, config, url) {
        this.initialConfig = initialConfig;
        this.url = url || config.defaults.trackerURL;
    }

    sendTracker(data, url) {
        const info = {
            data,
            project: this.initialConfig.token
        };

        return fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}
