import 'isomorphic-fetch';
import querystring from 'querystring';


export default class Tracker {
    constructor(window) {
        this.url = 'http://127.0.0.1:8000/project/capture';
        this.window = window;

        this.userLeaveListener();
    }

    userLeaveListener() {
        if (this.window.addEventListener) {
            this.window.addEventListener('beforeunload', (event) => {
                this.report(event);
                //event.returnValue = 'Testing...';
            });
        }
    }

    report(event) {
        const data = {
            timeStamp: event.timeStamp
        };

        return fetch(this.url, {
            credentials: 'include',
            method: 'POST',
            body: this.transformDataInQueryString(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
    }

    transformDataInQueryString(data) {
        return querystring.stringify(data);
    }
}
