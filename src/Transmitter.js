import 'isomorphic-fetch';
import querystring from 'querystring';


export default class Transmitter {
    constructor(config) {
        this.config = config;
    }

    sendTracker(data) {
        return fetch(this.config.defaults.trackerURL, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    }
}
