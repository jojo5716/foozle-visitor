import 'isomorphic-fetch';
import querystring from 'querystring';


export default class Transmitter {
    constructor(project, config) {
        this.config = config;
        this.project = project;

    }

    sendTracker(data) {
        const info = {
            data,
            project: this.project.token
        };

        return fetch(this.config.defaults.trackerURL, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    }
}
